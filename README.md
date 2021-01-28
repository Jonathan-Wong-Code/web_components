# The Moderna Web Component Library

The purpose of this library to provide a a repository of re-usable components that will be used across all future Moderna sites and projects.

It also provides the theming and design components to be used across future projects as well.

## Available Scripts

In the project directory, you can run:

### `ynpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test:coverage`

Runs the test suite and collects the coverage report.

### `npm run build`

Runs the rollup script and compiles the library. This should be done EVERYTIME before the library is published to npm

### `npm run storybook`

Runs storybook so we can see the Component Documentation

### `build-storybook`

Builds storybook into the static folder for deployment

### `npm eject`

Ejects Create-React-App.. Please don't run this :)

### `prebpublishOnly`

Prepublish script when building the package for deployment to NPM

### `convert-svg`

Uses SVGR and SVGO to convert the icons in the assets folder into React components for distribution from the `library/build/icons` bundle.

Should be run when any new icon is added to the icon library.

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Storybook

This project uses React storybook for component documentation.
Click events should be registered using storybook/addon-actions.
Instead of using knobs in Storybook we are using the recently released controls.
Have a look here for referencing them:

https://storybook.js.org/docs/react/essentials/controls

The storybook for the library can be viewed here: (TODO: Insert live site)

### Story Breakdown

Every variant of the component should have a story.

Ideally there'll be a default story (any optional props not entered) and stories for each individual variant of the component.

Examples of these might be

1. A Component might have different themes (primary, secondary, tertiary).

2. Different functionality (An accordion might only allow 1 accordion to open at a time or all of them. A Modal might center the content with "isCentered" prop or not.)

3. Any sort of prop which conditionally triggers certain styles or behaviour (A section may render an image on the left and text on the right or vice versa).

If unsure don't be afraid! Ask! :)

# Unit tests

Test Coverage for the Repo should ideally be at least 70%.

Run the unit tests:

    npm test

Test for coverage using

    npm run test:coverage

To view test coverage file

    open ./coverage/lcov-report/index.html

### Testing Guildlines

#### What to test?

Generally we want to test our application/components that resemble how our user would use them.

We're less concerned with testing that specific text appears/implementation details and more about behaviours.

This can include user-actions like testing what happens when the user clicks a button, or enters some text into a form. It can also include things like conditional rendering. What happens if different props are passed to a component?

For more information on this read: https://kentcdodds.com/blog/how-to-know-what-to-test

and https://kentcdodds.com/blog/testing-implementation-details

For General testing tips check out: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

Test coverage should remain at 70% or higher overall.

#### Which queries to use.

getByTestId should be the last resort/escape-hatch for when none of the other queries that testing-library provides applies.

Please read: https://testing-library.com/docs/queries/about/.

For a sort of heirarchy of queries and when to use them.

## Adding a Component to the Library

### Steps to Add a Compoenent to the Library:

#### Setup the folder and files

Create a folder in the `./src/components` folder.

For example `./src/components/MyComponent`

Inside that folder you should have the following:

- index.tsx
- index.stories.tsx
- `__tests__` = Containing an index.test.tsx + any mock data + test specific files.

Additionally you can add any sub-components you feel like are necessary.

Each component should have be documented in storybook as well as be tested for any critical functionality pieces.

#### Exporting it from the library.

Import the component to `./src/index.ts` and then export it from that file.

Go to the package.json and change the version # appropriately.

For information on versioning see: https://docs.npmjs.com/about-semantic-versioning

New features would include net new components

TODO: Figure out how build process works. Assuming it will be via the bitbucket CLI.

## Added a New Value to the Theme.

Sometimes we'll want to add a new value to the theme like a new color or a typography property.

To do that follow the following steps:

1. Go to `./src/styles/styles.d.ts` and update the theme interface.

Add the color to the appropriate color in the `./src//styles/colors.ts` file.

If for a value with typeof go to appropriate file (typography/spacing etc.) and fill in the correct value.

2. Add the new theme value for each theme in `./src/styles/themes.ts`.

Your new theme value should now be usable in and accessible in the theme!
