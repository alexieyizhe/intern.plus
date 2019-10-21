## Theme

Much like the `/components` directory, styles and theming used in multiple places in the app are all located here.
Global styles are defined here in a component, which is applied in the base `App` component.

Constants defined in the theme allow for easy changing of values like the default text colour if necessary.

Additionally, a media query tool with breakpoints is also defined here. The media query transforms specified device breakpoints into a string literal that will allow you to apply media queries using just `mediaQueries.XX\` ...styles here...\`` in styled components.

Both constants and media queries are bundled into a theme object and passed into styled-components' `ThemeProvider`. This makes them available for every styled-component to use, which is extremely convenient.

#### Further reading

- https://www.styled-components.com/docs/advanced#theming
