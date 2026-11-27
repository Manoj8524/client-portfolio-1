/**
 * Helper to resolve the correct CSS aspect-ratio string for a project card.
 * Priority: Item specific ratio -> Category ratio -> Active category ratio -> Global grid ratio -> '4/5'
 * Handles case-insensitivity, 'default' string elimination, and formats '4:5' -> '4/5'
 */
export function resolveCardRatio(
  itemRatio?: string,
  category?: string,
  activeCategory?: string,
  categoryRatios?: Record<string, string>,
  gridAspectRatio?: string
): string {
  // 1. Explicit item ratio override (if not 'default' or 'none')
  if (itemRatio && itemRatio !== 'default' && itemRatio !== 'none') {
    return itemRatio.replace(':', '/').trim();
  }

  // 2. Category ratio lookup (case-insensitive)
  const lookup = (cat?: string): string | undefined => {
    if (!cat || !categoryRatios) return undefined;
    const cleanCat = cat.trim().toUpperCase();
    for (const [key, val] of Object.entries(categoryRatios)) {
      if (key.trim().toUpperCase() === cleanCat) {
        if (val && val !== 'default' && val !== 'none') {
          return val.replace(':', '/').trim();
        }
      }
    }
    return undefined;
  };

  const found = lookup(category) || lookup(activeCategory);
  if (found) return found;

  // 3. Fallback to global grid ratio
  if (gridAspectRatio && gridAspectRatio !== 'default' && gridAspectRatio !== 'none') {
    return gridAspectRatio.replace(':', '/').trim();
  }

  return '4/5';
}
