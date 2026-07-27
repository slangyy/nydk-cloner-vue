import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUiStore = defineStore("ui", () => {
  const isMobileMenuOpen = ref(false);
  const openMobileGroup = ref<string | null>(null);
  const isHeaderHidden = ref(false);
  const isHeaderSolid = ref(false);

  const isBodyLocked = computed(() => isMobileMenuOpen.value);

  function toggleMobileMenu(): void {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (!isMobileMenuOpen.value) {
      openMobileGroup.value = null;
    }
  }

  function closeMobileMenu(): void {
    isMobileMenuOpen.value = false;
    openMobileGroup.value = null;
  }

  function toggleMobileGroup(group: string): void {
    openMobileGroup.value = openMobileGroup.value === group ? null : group;
  }

  function setHeaderState(hidden: boolean, solid: boolean): void {
    isHeaderHidden.value = hidden;
    isHeaderSolid.value = solid;
  }

  return {
    isMobileMenuOpen,
    openMobileGroup,
    isHeaderHidden,
    isHeaderSolid,
    isBodyLocked,
    toggleMobileMenu,
    closeMobileMenu,
    toggleMobileGroup,
    setHeaderState,
  };
});
