# vue-ads-pagination

Vue ads pagination is a vue js pagination component. 
On the left side you find some information about the shown items.
On the right side you can select a specific, the first, last, next or previous page.

It uses the handy
[tailwind](https://tailwindcss.com/docs/what-is-tailwind/) css library for styling.

## Demo

![Demo](https://media.giphy.com/media/1AfMQogZf9Y5ci8ck3/giphy.gif)

I've written a demo in [JSFiddle](https://jsfiddle.net/arnedesmedt/18n9k6vm)

## Installation

You can install the package via npm or yarn.

#### NPM

```npm install vue-ads-pagination --save```

#### YARN

```yarn add vue-ads-pagination```

## Usage

You can add the vue-ads-pagination component by using the following code in your project.

```vue
<template>
    <div id="app">
        <vue-ads-pagination
            :total-items="200"
            :max-visible-pages="4"
            :page="3"
            @page-change="pageChange"
            :detail-classes="['underline']"
            :button-classes="buttonClasses"
            :loading="true"
        >
            <template slot-scope="props">
                Items {{ props.range.start }} tot {{ props.range.end }} van de {{ props.range.total }}
            </template>
        </vue-ads-pagination>
    </div>
</template>

<script>
import VueAdsPagination from 'vue-ads-pagination';

export default {
    name: 'app',
    components: {
        VueAdsPagination,
    },

    data () {
        return {
            'buttonClasses': {
                'default': ['border-none', 'bg-grey-lightest'],
                'active': ['bg-orange', 'border-none'],
                'dots': ['bg-white'],
                'disabled': ['bg-grey-light'],
            },
        };
    },

    methods: {
        pageChange (page, range) {
            console.log(page, range);
        },
    },
};
</script>
```

### Properties

- `page`: *(type: number, default: 0)* A zero-based number to set the page.
- `itemsPerPage`: *(type: number, default: 10)* The max amount of items on one page.
- `maxVisiblePages`: *(type: number, default: 5)* The number of pages to be visible if their are too many pages.
- `totalItems`: *(type: number, required)* The total amount of items.
- `loading`: *(type: boolean, default: false)* Indicates if the current page is loading.
- `detailClasses`: *(type: array)* A list of (tailwind) classes you can add to change the detail box ui.
- `buttonClasses`: *(type: object)* An object to change the buttons ui for each state:
    - `default`: *(type: array)* A list of (tailwind) classes you can add to change the ui of the default button. These classes are added on all buttons.
    - `active`: *(type: array)* A list of (tailwind) classes you can add to change the ui of the active button.
    - `disabled`: *(type: array)* A list of (tailwind) classes you can add to change the ui of the disabled button.
    - `dots`: *(type: array)* A list of (tailwind) classes you can add to change the ui of the dots.

### Events

- `page-change`: Emitted on creation, to know the initial state, and if another page is clicked. It contains the following parameters:
    - `page`: *(type: number)* The zero-based current page.
    - `range`: *(type: object)* Object with the following parameters:
        - `start`: *(type: number)* A zero-based number to identify the first item.
        - `end`: *(type: number)* A zero-based number to identify the last item.
        
### Templates

#### Default

You can add a default template to use a custom pagination detail box.
The scope contains only one variable: the range object. It contains three parameters:

- `start`: *(type: number)* The one-based start item.
- `end`: *(type: number)* The one-based end item.
- `total`: *(type: number)* The total number of available items.

```vue
<template slot-scope="props">
    {{ props.range.start }} - {{ props.range.end }} : Total {{ props.range.total }}
</template>
```

## Testing

We use the jest framework for testing this pagination component. Run the following command to test it:

```
npm run test:unit
```

## Changelog

Read the [CHANGELOG](CHANGELOG.md) file to check what has changed.

## Issues

If you have any issues (bugs, features, ...) on the current project, add them [here](https://gitlab.com/arnedesmedt/vue-ads-pagination/issues/new).

## Contributing

Do you like to contribute to this project? Please, read the [CONTRIBUTING](CONTRIBUTING.md) file.

## Social

[1]: http://www.twitter.com/arnesmedt
[1.1]: http://i.imgur.com/wWzX9uB.png (@ArneSmedt)
 - Follow me on [![alt text][1.1]][1]
 
## Donate

Want to make a donation? 
That would be highly appreciated!

Make a donation via [PayPal](https://www.paypal.me/arnedesmedt).
