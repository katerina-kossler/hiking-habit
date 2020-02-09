class HomePage extends React.Component {
    render() {
    return (
        <div class='options'>
            <a href="/login">Log-in</a> |
            <a href="/register">Sign-up</a>
        </div>
    );
    }
}

class LoginPage extends React.Component {
    render() {
    return (
        <div>Login Form Here</div>
    )
    }
}

class TrailsPage extends React.Component {
    render() {
    return(
        <div>Trails Search always displays; when searched also show results</div>
    )
    }
}