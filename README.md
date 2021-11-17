# React-Query-Class-Component
A HOC Utility tool built for [react-query](https://www.npmjs.com/package/react-query), through this you can use react-query hooks to fetch and pass data in your React class based components.

[![NPM version](https://img.shields.io/npm/v/react-query-class-component.svg)](https://www.npmjs.com/package/react-query-class-component)
[![npm](https://img.shields.io/npm/dt/react-query-class-component.svg)](https://www.npmjs.com/package/react-query-class-component)
[![GitHub stars](https://img.shields.io/github/stars/emgk/react-query-class-component.svg?style=social&label=Star)](https://github.com/emgk/react-query-class-component)

## Features

- ReactQueryClassProvider (Context API provider)
- withReactQuery (HOC)

## Quick Setup

Install package in your project
```composer log
npm i react-query-class-component
```
```tsx
import {ReactQueryClassProvider, withReactQuery} from "react-query-class-component";
```

## Usage with React-Query

It supports almost all of the hooks, below are the examples of few ones:

### useQuery

```tsx
import React from 'react';

import {QueryClient, QueryClientProvider, useQueries, useQuery} from "react-query";
import {ReactQueryClassProvider, withReactQuery} from 'react-query-class-component';

const queryClient = new QueryClient();

export const AppRoot = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryClassProvider queries={{
                // useQuery example
                todoSingle: {
                    hook: useQuery,
                    params: ['todos', () => {
                        return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
                    }],
                },
            }}>
                <App/>
            </ReactQueryClassProvider>
        </QueryClientProvider>
    );
}
```
Once you have added provider, you can then use wrap your class component with `withReactQuery` method to get react-query data
```tsx

class TodoList extends React.Component {
    render() {
        const {reactQueries} = this.props;
        
        // for ya ;)
        console.log( 'debug', reactQueries);
        
        // you can access data using same id you you defined in ReactQueryClassProvider queries props.
        if ( reactQueries?.todoSingle?.isLoading ) {
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

export default TodoList = withReactQuery(TodoList);
```

### useQuery + options

```tsx
import React from 'react';

import {QueryClient, QueryClientProvider, useQueries, useQuery} from "react-query";
import {ReactQueryClassProvider, withReactQuery} from 'react-query-class-component';

const queryClient = new QueryClient();

export const AppRoot = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryClassProvider queries={{
                // useQuery example
                todoSingle: {
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
            }}>
                <App/>
            </ReactQueryClassProvider>
        </QueryClientProvider>
    );
}
```

### useQueries

```tsx
import React from 'react';

import {QueryClient, QueryClientProvider, useQueries, useQuery} from "react-query";
import {ReactQueryClassProvider, withReactQuery} from 'react-query-class-component';

const queryClient = new QueryClient();

export const AppRoot = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryClassProvider queries={{
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
            </ReactQueryClassProvider>
        </QueryClientProvider>
    );
}
```
```tsx

class TodoList extends React.Component {
    render() {
        const {reactQueries} = this.props;
        
        // for ya ;)
        console.log( 'debug', reactQueries);
        
        // you can access data using same id you you defined in ReactQueryClassProvider queries props.
        if ( reactQueries?.todoSingle?.isLoading ) {
            return 'Loading...';
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

export default TodoList = withReactQuery(TodoList);
```

## API

### ReactQueryClassProvider
It should be placed within `QueryClientProvider`

#####   Parameters
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

### withReactQuery
To get queries result in your class component you will need to wrap your class component with this method, then you access queries using `this.props.reactQuries` prop variable.

#### Screenshot of "reactQueries" props value in class component
![Demo-screenshot](https://i.ibb.co/3Cg1Hfz/Screenshot-from-2021-11-17-14-13-52.png)

## Contribution
Please raise issue or sent Pull Request if you find any bugs in package. 
