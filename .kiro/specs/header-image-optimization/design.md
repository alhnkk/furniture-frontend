# Design Document

## Overview

This design optimizes the header component to reduce its vertical footprint while ensuring billboard images are displayed in their entirety without cropping. The solution involves changing the image display method from `object-cover` to `object-contain`, adjusting container heights, and maintaining all existing visual effects and animations.

## Architecture

The header optimization will maintain the existing two-component architecture:

- `Header` (Server Component): Handles image preloading and optimization
- `HeaderClient` (Client Component): Manages carousel functionality and animations

### Key Changes

1. **Image Display Method**: Switch from `object-cover` to `object-contain` to show complete images
2. **Container Height Reduction**: Reduce fixed heights while maintaining responsive design
3. **Background Enhancement**: Add subtle background styling to handle potential letterboxing
4. **Responsive Scaling**: Adjust breakpoint-specific heights proportionally

## Components and Interfaces

### Header Component (Server)

- **Current**: Preloads images with crop parameters (`c_fill,g_center`)
- **Updated**: Modify Cloudinary transformation to use `c_fit` instead of `c_fill` for better aspect ratio preservation
- **Interface**: No changes to props or external API

### HeaderClient Component (Client)

- **Current**: Uses fixed heights (360px mobile, 768px desktop) with `object-cover`
- **Updated**: Reduced heights (280px mobile, 600px desktop) with `object-contain`
- **Interface**: No changes to props, maintains all existing functionality

## Data Models

No changes to existing data models. The `Billboard` type remains unchanged:

```typescript
interface Billboard {
  id: string;
  label: string;
  description?: string;
  image?: {
    url: string;
  };
}
```

## Implementation Details

### Image Optimization Strategy

```typescript
// Current Cloudinary transformation
"/upload/f_webp,q_auto:eco,w_1920,h_768,c_fill,g_center,fl_progressive/";

// Updated Cloudinary transformation
"/upload/f_webp,q_auto:eco,w_1920,h_600,c_fit,fl_progressive/";
```

### Height Adjustments

- **Mobile**: 360px → 280px (22% reduction)
- **Desktop**: 768px → 600px (22% reduction)
- **Aspect Ratio**: Remove fixed aspect-[2.4/1] constraint

### CSS Changes

```css
/* Current */
.image-container {
  height: 360px; /* lg:h-[768px] */
  object-fit: cover;
}

/* Updated */
.image-container {
  height: 280px; /* lg:h-[600px] */
  object-fit: contain;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}
```

### Background Styling

To handle potential letterboxing when images don't fill the container:

- Add subtle gradient background
- Maintain existing overlay gradients
- Ensure text remains readable over any background

## Error Handling

### Image Loading Failures

- Maintain existing fallback UI for missing billboard data
- Add graceful degradation for images that fail to load
- Preserve existing blur placeholder functionality

### Responsive Breakpoint Handling

- Ensure smooth transitions between mobile and desktop layouts
- Maintain proportional scaling across all screen sizes
- Test edge cases for very wide or very tall images

## Testing Strategy

### Visual Regression Testing

1. **Image Display**: Verify complete images are visible without cropping
2. **Height Reduction**: Confirm header takes less vertical space
3. **Responsive Design**: Test across mobile, tablet, and desktop viewports
4. **Animation Preservation**: Ensure all existing animations work correctly

### Cross-Browser Testing

- Test image `object-contain` behavior across browsers
- Verify Cloudinary transformations work consistently
- Check gradient overlay rendering

### Performance Testing

- Measure impact of height changes on Cumulative Layout Shift (CLS)
- Verify image loading performance with new transformations
- Test carousel performance with updated dimensions

### Accessibility Testing

- Ensure navigation buttons remain accessible
- Verify text contrast over new background styling
- Test keyboard navigation functionality

## Migration Considerations

### Backward Compatibility

- Changes are purely visual/CSS-based
- No breaking changes to component APIs
- Existing carousel functionality preserved

### Deployment Strategy

- Changes can be deployed incrementally
- No database migrations required
- Cloudinary transformations are URL-based (immediate effect)

### Rollback Plan

- Simple CSS class reversion for heights
- Cloudinary URL parameter rollback for image transformations
- No data loss risk

## Performance Impact

### Positive Impacts

- Reduced header height improves above-the-fold content visibility
- `object-contain` may reduce image processing overhead
- Smaller container heights reduce DOM rendering area

### Considerations

- Potential letterboxing may require additional background rendering
- New Cloudinary transformations need cache warming
- Monitor Core Web Vitals after deployment
