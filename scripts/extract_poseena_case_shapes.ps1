param(
  [Parameter(Mandatory = $true)]
  [string]$SourcePath,
  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory,
  [int[]]$SlideNumbers = @(),
  [switch]$IncludeSmallPhotos
)

$ErrorActionPreference = "Stop"
$password = Read-Host "PowerPoint password"
$powerPoint = $null
$presentation = $null

try {
  New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
  $powerPoint = New-Object -ComObject PowerPoint.Application
  $presentation = $powerPoint.Presentations.Open(
    "$SourcePath`::$password",
    $true,
    $true,
    $false
  )

  $slideWidth = [double]$presentation.PageSetup.SlideWidth
  $slideHeight = [double]$presentation.PageSetup.SlideHeight
  $caseStarts = @(172, 180, 190, 197, 206)
  $casePrefix = '!!' + [char]0x6848 + [char]0x4F8B
  $fixedMarker = [string][char]0x56FA + [char]0x5B9A
  $introName = $casePrefix + $fixedMarker + 'a05'

  if ($SlideNumbers.Count -eq 0) {
    $SlideNumbers = @(172..218)
  }

  foreach ($slideNumber in $SlideNumbers) {
    $slide = $presentation.Slides.Item($slideNumber)
    foreach ($shape in $slide.Shapes) {
      $name = [string]$shape.Name
      $left = [double]$shape.Left
      $top = [double]$shape.Top
      $width = [double]$shape.Width
      $height = [double]$shape.Height
      $isOnCanvas = $left -lt $slideWidth -and $top -lt $slideHeight -and
        ($left + $width) -gt 0 -and ($top + $height) -gt 0
      $isLargePhoto = if ($IncludeSmallPhotos) {
        $width -ge 180 -and $height -ge 150
      } else {
        $width -ge 500 -and $height -ge 300
      }
      $isCasePhoto = $name.StartsWith($casePrefix) -and
        -not $name.Contains($fixedMarker) -and
        ($IncludeSmallPhotos -or $name -match '01$')
      $isCaseIntro = $caseStarts -contains $slideNumber -and
        $name -eq $introName

      if (-not $isOnCanvas -or (-not $isCaseIntro -and
          (-not $isCasePhoto -or -not $isLargePhoto))) {
        continue
      }

      $safeName = $name -replace '[^\p{L}0-9]', '-'
      $outputPath = Join-Path $OutputDirectory (
        '{0:D3}-{1:D2}-{2}.png' -f $slideNumber, $shape.ZOrderPosition, $safeName
      )
      $aspectRatio = $width / $height
      if ($aspectRatio -ge 1) {
        $exportWidth = 2560
        $exportHeight = [Math]::Max(1, [Math]::Round(2560 / $aspectRatio))
      } else {
        $exportHeight = 2560
        $exportWidth = [Math]::Max(1, [Math]::Round(2560 * $aspectRatio))
      }
      $shape.Export($outputPath, 2, $exportWidth, $exportHeight)
      Write-Host "Exported slide $slideNumber shape $name"
    }
  }
} finally {
  if ($null -ne $presentation) {
    $presentation.Close()
  }
  if ($null -ne $powerPoint) {
    $powerPoint.Quit()
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
