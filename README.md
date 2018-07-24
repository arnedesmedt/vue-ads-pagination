# vue-ads-pagination

Vue ads pagination is a vue js pagination component. 
On the left side you find some information about the shown items.
On the right side you can select a specific, the first, last, next or previous page.

It uses the handy
[tailwind](https://tailwindcss.com/docs/what-is-tailwind/) css library for styling.

## Installation

You can install the package via npm or yarn.

#### NPM

```npm install vue-ads-pagination --save```

#### YARN

```yarn add vue-ads-pagination```

## Usage

You can use the vue-ads-pagination component by using the following code in your project.

```vue
<template>
  <div id="app">
    <vue-ads-pagination
        :startPage="3"
        :itemsPerPage="10"
        :maxVisiblePages="4"
        :totalItems="200"
        @click="click"
    />
  </div>
</template>

<script>
import VueAdsPagination from 'vue-ads-pagination';

export default {
    name: 'app',
    components: {
        VueAdsPagination,
    },

    methods: {
        click (page) {
            console.log(page);
        },
    },
};
</script>
```

### Properties

| property | required | default | description |
| --- | --- | --- | --- |
| startpage | false | 0 | A zero-based number to set the initial page |
| itemsPerPage | false | 10 | The max amount of items on one page |
| maxVisiblePages | false | 5 | The number of pages to be visible if their are too many pages |
| totalItems | true |  | The total amount of items |

### Methods

| method | parameters | description |
| --- | --- | --- |
| click | page, range | Emitted if another page is clicked. Two parameters are given: The zero-based page and the range. This is an object that contain the start and end keys. They contain a zero-based number to identify the items to be shown.|

## Testing

We use the jest framework for testing this pagination component. Run the following command to test it:

```
npm run test:unit
```

## Issues

If you have any issues (bugs, features, ...) on the current project, add them [here](https://gitlab.com/arnedesmedt/vue-ads-pagination/issues/new).

## Contributing

If you would like to contribute to the current project, follow these rules:
 
 - one pull request per issue (bug, feature, ...).
 - Test the changes if possible.
 - Update the readme if necessary.
 - Update the changelog if necessary.
 
Want to start now? Check the [issues tab](https://gitlab.com/arnedesmedt/vue-ads-pagination/issues) in gitlab, fork and start coding!

## Changelog

| version | changes | 
| --- | --- |
| v0.1.9 | Convert item details to a slot. Now you can create your own text, in your own language for the item details. |
| v0.1.8 | Readme updated |
