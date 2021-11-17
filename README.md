# React-Query-Class-Component

A HOC Utility tool built for [react-query](https://www.npmjs.com/package/react-query), through this you can use
react-query hooks to fetch and pass data in your React class based components.

[![NPM version](https://img.shields.io/npm/v/react-query-class-component.svg)](https://www.npmjs.com/package/react-query-class-component)
[![npm](https://img.shields.io/npm/dt/react-query-class-component.svg)](https://www.npmjs.com/package/react-query-class-component)
[![GitHub stars](https://img.shields.io/github/stars/emgk/react-query-class-component.svg?style=social&label=Star)](https://github.com/emgk/react-query-class-component)

## Features

- QueryClientClassProvider (Context API provider)
- withQueryClient (HOC)

## Quick Setup

Install package in your project

```composer log
npm i react-query-class-component
```

```tsx
// To pass query data globally
import {QueryClientClassProvider, withQueryClient} from "react-query-class-component";

// To use react-query hook in class component
import {QueryClientHook} from "react-query-class-component";
```

## Usage with React-Query

It supports almost all the hooks, below are the examples of few ones:

### Use react-query hook in component
```tsx
import React from 'react';

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { QueryClientHook } from 'react-query-class-component';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TodoList/>
        </QueryClientProvider>
    );
}

class TodoList extends React.Component {
    render() {
        return (
            <QueryClientHook
                hook={useQuery} // react query hook
                params={
                    [
                        'todos', // keyName
                        () => { // query function
                            return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json());
                        },
                        // ...options
                    ]
                }>
                {({data, isLoading}) => {
                    if (isLoading) return <h1>Loading</h1>;
                    return (
                        <div className="App">
                            <h2>Todo list</h2>
                            {
                                data.map((query, key) => {
                                    return <li key={key}>{query?.title}</li>;
                                })
                            }
                        </div>
                    );
                }}
            </QueryClientHook>
        )
    }
}
```

### Pass data globally

```tsx
import React from 'react';

import {QueryClient, QueryClientProvider, useQueries, useQuery} from "react-querynnnt";
import {QueryClientClassProvider, withQueryClient} from 'react-query-class-component';

const queryClient = new QueryClient();

export const AppRoot = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <QueryClientClassProvider queries={{
                // useQuery example
                todoSingle: {
                    hook: useQuery,
                    params: ['todos', () => {
                        return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
                    }],
                },
                // with options
                todoSingleDisableRefetch: {
                    hook: useQuery,
                    params: [
                        {
                            queryKey: 'todos-disable-refetch',
                            queryFn: () => {
                                return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
                            },
                            // you can mention options here...
                            refetchOnWindowFocus: false,
                        }
                    ],
                },
                // useQueries example
                todoMulti: {
                    hook: useQueries,
                    params: [
                        [
                            {
                                queryKey: ['post', 1], queryFn: () => {
                                    return fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json());
                                }
                            },
                            {
                                queryKey: ['post', 2], queryFn: () => {
                                    return fetch('https://jsonplaceholder.typicode.com/todos/2').then(res => res.json());
                                }
                            },
                        ]
                    ],
                }
            }}>
                <App/>
            </QueryClientClassProvider>
        </QueryClientProvider>
    );
}
```

Once you have finished passing queries in provider, then you can wrap your component with `withQueryClient` method to get queries result in `reactQueries` prop variable.

```tsx
class TodoList extends React.Component {
    render() {
        const {reactQueries} = this.props;

        // for ya ;)
        console.log('debug', reactQueries);

        // you can access data using same id you you defined in QueryClientClassProvider queries props.
        if (reactQueries?.todoSingle?.isLoading) {
            return 'Loading data...';
        }

        // reperesent data
        return (
            <>
                {reactQueries.todoSingle?.data.map((query, key) => {
                    return <li key={key}>{query?.title}</li>;
                })}
            </>
        )
    }
}

export default TodoList = withQueryClient(TodoList);
```

## API

### QueryClientHook
To use react-query hook in class component
##### Parameters

- ```hook?: any```
  - react-query hook , eg. useQuery, useQueries etc...
- ```params?: any```
  - List of params to pass in react-query hook
    
### QueryClientClassProvider

It should be placed within `QueryClientProvider`

##### Parameters

- ```queries?: any```
    - List of objects that contains react-query hook and params in following format:
    ```tsx
        queries={{
                'fetch-1': { // mention id here
                    hook: useQuery, // react-query hook
                    params: [ // list of params to be passed in hook mentioned above.
                        {
                            queryKey: 'todos-disable-refetch',
                            queryFn: () => {
                                return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
                            },
                            // options
                            refetchOnWindowFocus: false,
                        }
                    ],
                },
                'fetch-2': { // mention id here
                    hook: useQuery, // react-query hook
                    params: [ // list of params to be passed in hook mentioned above.
                        {
                            queryKey: 'todos-disable-refetch',
                            queryFn: () => {
                                return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
                            },
                            // options
                            refetchOnWindowFocus: false,
                        }
                    ],
                },
            }}
    ```

### withQueryClient

To get queries result in your class component you will need to wrap your class component with this method, then you
access queries using `this.props.reactQuries` prop variable.

#### Screenshot of "reactQueries" props value in class component

![Demo-screenshot](https://i.ibb.co/3Cg1Hfz/Screenshot-from-2021-11-17-14-13-52.png)

## Contribution

Please raise issue or sent Pull Request if you find any bugs in package. 
