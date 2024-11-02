import * as ReactDOM from 'react-dom/client';
import '@renderer/assets/css/index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </Router>
);

