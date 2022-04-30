import App from './App';
import reportWebVitals from './reportWebVitals';
import {  QueryClientProvider, QueryClient } from 'react-query';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from 'react-query/devtools';

export const client = new QueryClient();

const container = document.getElementById('root') as any;
const root = createRoot(container);
root.render(
    <QueryClientProvider client={client} >
        <App /> 
        <ReactQueryDevtools initialIsOpen={true} position='bottom-left' />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
