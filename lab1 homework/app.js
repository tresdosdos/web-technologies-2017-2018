 const menuItem = React.createClass({
        name: 'menuItem',
        _log: function () {
            console.log(this.name + ' is working');
        },
        getInitialState: function () {
            return{
                isEnabled: false
            };
        },
        _changeState: function () {
            const menu = document.getElementById('hiddenMenu');
            if (this.state.isEnabled)
            {
                this.setState({
                    isEnabled: false
                });
                menu.className = 'hiddenMenu';
            }
            else {
                this.setState({
                    isEnabled: true
                });
                menu.className = 'openMenu';
            }
            this._log();

        },
        render: function () {
            return React.DOM.button({
                onClick: this._changeState,
                className: 'menuButton'
            });
        }
    });

    ReactDOM.render(
        React.createElement(menuItem), document.getElementById('smallMenu')
    );

