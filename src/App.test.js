import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from "react-router-dom";

test('renders the landing page', () => {
  render(
    <BrowserRouter>
        <App />
    </BrowserRouter>);
});