## Complex Components Using ResizeObserver

### CroppedText Component
**Location**: `src/components/picklematch/CroppedText/CroppedText.tsx`

**Purpose**: Intelligent text truncation with ellipsis that adapts to container width changes.

**Implementation**:
```typescript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (prevWidth !== entry.contentRect.width) {
      prevWidth = entry.contentRect.width;
      fn(); // Triggers binary search algorithm
    }
  }
});
```

**Why ResizeObserver is Essential**:
- **Dynamic width changes**: Container can resize due to viewport changes, parent element modifications, or CSS updates
- **Binary search optimization**: Uses ResizeObserver to trigger efficient text fitting algorithm
- **Performance**: Avoids continuous polling while ensuring text always fits perfectly
- **Responsive design**: Automatically adapts to any layout changes without manual intervention

**Use Case**: Perfect for responsive cards, sidebars, or any container where text content must adapt to available space.

