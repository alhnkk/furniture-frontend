# Implementation Plan

- [ ] 1. Update Cloudinary image transformation parameters

  - Modify the image URL transformation in both Header and HeaderClient components
  - Change from `c_fill,g_center` to `c_fit` to preserve aspect ratios
  - Update width and height parameters to match new container dimensions
  - _Requirements: 1.1, 1.2_

- [ ] 2. Reduce header container heights and update styling

  - Change mobile height from 360px to 280px
  - Change desktop height from 768px to 600px
  - Remove fixed aspect ratio constraint that forces cropping
  - Add background gradient styling to handle potential letterboxing
  - _Requirements: 2.1, 2.2, 3.2_

- [ ] 3. Update image display method from cover to contain

  - Change CSS object-fit from `object-cover` to `object-contain`
  - Ensure images display completely without cropping
  - Maintain existing image filters and hover effects
  - _Requirements: 1.1, 1.2, 3.1_

- [ ] 4. Adjust text positioning and navigation elements

  - Update text container positioning to work with new heights
  - Ensure navigation buttons and dots remain properly positioned
  - Maintain responsive text sizing across different screen sizes
  - _Requirements: 3.3, 4.1, 4.3_

- [ ] 5. Test responsive behavior across breakpoints
  - Verify header displays correctly on mobile, tablet, and desktop
  - Test image display with various aspect ratios
  - Ensure all interactive elements remain accessible
  - Validate that animations and transitions work smoothly
  - _Requirements: 4.1, 4.2, 4.3_
