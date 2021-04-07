import React from 'react';
import Sidebar_Chat from './Sidebar_Chat';
import './ChatApp.css';
import Chat from './ChatBody';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function ChatApp() {
    return (
        <div className="chatApp">
            <div className="chatApp__body">
                <Router>
                    <Sidebar_Chat />
                    <Switch>
                        <Route path="/chats/:friendId">
                            <Chat />
                        </Route>
                        <Route path="/">{/* <Chat /> */}</Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default ChatApp;
