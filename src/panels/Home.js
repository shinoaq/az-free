import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Switch, InfoRow, InfoRowProps, SimpleCell, FormItem, Input, View } from '@vkontakte/vkui';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: [] };
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }

	componentDidMount() {
		axios.get('https://bot.shinoa.tech/az_free/stats.php?settings')
		.then(res => {
			res.data.ban_post = (res.data.ban_post === 't');
			res.data.ban_comment = (res.data.ban_comment === 't');
			const data = res.data;
			console.log(res);
			this.setState({ warns : res.data.warns, bans: res.data.bans, ban_post : res.data.ban_post, ban_comment : res.data.ban_comment, post_delay : res.data.post_delay, comment_delay : res.data.comment_delay });
		})
	  }
	
	  handleChange(event) {
		let nam = event.target.name;
		let val = event.target.value;
		if (nam === 'ban_comment' || nam === 'ban_post') {
			val = event.target.checked;
		}
		this.setState({[nam]: val});
	  }
	
	  handleSubmit(event) {
		axios.get('https://bot.shinoa.tech/az_free/stats.php?ban_post='+this.state.ban_post+'&ban_comment='+this.state.ban_comment+'&post_delay='+this.state.post_delay+'&comment_delay='+this.state.comment_delay)
		event.preventDefault();
	  }

    render() {
        return (
			<View activePanel="main">
				<Panel id="main">
					<PanelHeader>Настройка бота</PanelHeader>

					<Group header={<Header mode="secondary">Info</Header>}>
			        	<SimpleCell>
			          		<InfoRow header="Выдано предупреждений:">
							  { this.state.warns }
			          		</InfoRow>	
							  <InfoRow header="Выдано блокировок:">
							  { this.state.bans }
			          		</InfoRow>
			        	</SimpleCell>
			      	</Group>
					<Group header={<Header mode="secondary">Settings</Header>}>
					<form onSubmit={this.handleSubmit}>
			        	<Cell disabled after={<Switch name="ban_post" checked = { this.state.ban_post } onChange={this.handleChange}/>}>
							Блокировать за посты
			        	</Cell>
			        	<Cell disabled after={<Switch name="ban_comment" checked = { this.state.ban_comment } onChange={this.handleChange}/>}>
			          		Блокировать за комментарии
			        	</Cell>
						<FormItem top="Задержка между созданием постов">
			        		<Input type="number" name="post_delay" value= { this.state.post_delay } onChange={this.handleChange}/>
			      		</FormItem>
						  <FormItem top="Задержка между созданием комментариев">
			        		<Input type="number" name="comment_delay" value = { this.state.comment_delay } onChange={this.handleChange}/>
			      		</FormItem>
						<Div style={{display: 'flex'}}>
			       			<Button size="l" type="submit" stretched>Сохранить</Button>
			     		</Div>
						 </form>
			      	</Group>

				</Panel>
			</View>
        );
    }
}

export default App;