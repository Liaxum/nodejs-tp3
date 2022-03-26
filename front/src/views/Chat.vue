<template>
	<div class="container">
		<div>
			<form @submit.prevent="sendMessage">
				<div>
					<label for="title"
						>Username for chat:</label
					>
					<input
						type="text"
						name="user"
						v-model="user"
					/>
				</div>
				<div>
					<textarea
						name="text"
						v-model="message"
						placeholder="Write up..."
					></textarea>
				</div>
				<button type="submit">Send</button>
			</form>
		</div>
		<div class="message" v-if="messages.length">
			<ul>
				<li
					v-for="(message, index) in messages"
					:key="index"
				>
					<div id="post-div">
						<p>{{ message.user }} : {{message.message }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>Oh no!!! We have no message</div>
	</div>
</template>
<script>
	import io from "socket.io-client";

	export default {
		name: "Chat",
		mounted() {
			this.socket.on("MESSAGE", (data) => {
				this.messages = [...this.messages, data];
				// you can also do this.messages.push(data)
			});
		},
		data() {
			return {
				user: "",
				message: "",
				messages: [],
				socket: io("localhost:3000"),
			};
		},
		methods: {
			sendMessage(e) {
				e.preventDefault();

				this.socket.emit("SEND_MESSAGE", {
					user: this.user,
					message: this.message,
				});
				this.message = "";
			},
		},
	};
</script>
<style scoped>
	* {
		box-sizing: border-box;
	}

	label {
		padding: 12px 12px 12px 0;
		display: inline-block;
	}

	button[type="submit"] {
		background-color: #4caf50;
		color: white;
		padding: 12px 20px;
		cursor: pointer;
		border-radius: 30px;
		margin: 10px;
	}

	button[type="submit"]:hover {
		background-color: #45a049;
	}

	input {
		width: 60%;
		margin: 15px;
		border: 0;
		box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
		padding: 10px;
		border-radius: 30px;
	}

	textarea {
		width: 75%;
		resize: vertical;
		padding: 15px;
		border-radius: 15px;
		border: 0;
		box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
		height: 150px;
		margin: 15px;
	}

	ul {
		list-style: none;
	}

	#message-div {
		width: 500px;
		margin: auto;
		margin-bottom: 5px;
	}
</style>
