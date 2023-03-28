<template>
	<div class="sharing-wrapper">
		<h2 class="sharing-title">
			<img src="~/assets/images/template/transform-robot.svg" alt="Normie">
			Invite users to join this tool
		</h2>

		<div class="mode-default" v-show="mode === 'default'">
			<div class="message mb-default">
				<h3 class="sharing-subtitle">Collaborative Tool</h3>
				<p>Guests can collaborate on this tool simultaneously. Information submitted is visible to you and to all collaborators.</p>
			</div>

			<form-group class="mb-double">
				<input
					class="input-block form-control"
					type="email"
					@focus="modeEmail"
					placeholder="johndoe@gmail.com, janedoe@outlook.com"
				/>
			</form-group>

			<div class="sharing-people">
				<h3 class="sharing-subtitle">People with access</h3>

				<div class="people-wrapper">
					<template v-if="invitees.length">
						<div class="person" v-for="person in invitees" :key="`person-${person.email}`">
							<div class="media-object person-info">
								<div class="media">
									<img
										:src="getAvatar(person.email)"
										class="avatar"
										:alt="person.name || 'Worksheet User'"
									>
								</div>
								<div class="media-body">
									<h4>{{ person.name || 'Worksheet User' }}</h4>
									<p>{{ person.email }}</p>
								</div>
							</div>
							<form-group>
								<select class="form-control form-control-small">
									<option value="owner">Owner</option>
									<option value="coowner">Co-Owner</option>
									<option value="view-only">View Only</option>
									<option value="editor">Editor</option>
								</select>
							</form-group>
						</div>
					</template>
					<div class="empty-state" v-else>
						<img src="~/assets/images/template/tumbleweed.gif" alt="Empty, so empty...">
						<p>No one has access to this tool yet.</p>
					</div>
				</div>

				<toggle-switch
					v-model="guestShare"
					label="Allow guests to share this tool with others"
					off-label="Allow guests to share this tool with others"
				/>
			</div>
			<div class="sharing-actions">
				<h3 class="sharing-subtitle">Other sharing methods</h3>
				<div class="sharing-action">
					<i class="far fa-fw fa-link"></i>
					<span>Share a link to invite users</span>
					<a href="#" class="button button-small button-secondary">Copy Link</a>
				</div>

				<div class="sharing-action">
					<i class="far fa-fw fa-code"></i>
					<span>Embed this tool on a website</span>
					<a
						href="#"
						@click.prevent="mode = 'embed'"
						class="button button-small button-secondary"
					>Get Embed Code</a>
				</div>
			</div>
		</div>

		<div class="mode-email" v-show="mode === 'email'">
			<div class="mb-default">
				<a href="#" class="button button-link button-back" @click.prevent="returnMode">
					<i class="fas fa-fw fa-arrow-left icon" /> Share this tool
				</a>
			</div>

			<div class="row">
				<div class="col col-8">
					<form-group>
						<multiselect
							:disabled="sending"
							ref="multiselect"
							v-model="people"
							:options="options"
							:taggable="true"
							:multiple="true"
							label="email"
							placeholder="Type an email to invite someone"
							@open="removeBadEmail"
							@search-change="checkInput"
							@tag="addPerson"
							@remove="removePerson"
						/>
						<transition-slide>
							<p class="help-block" v-if="badEmail">Please enter a valid email address.</p>
						</transition-slide>
					</form-group>
				</div>
				<div class="col col-4">
					<form-group>
						<select :disabled="sending" v-model="inviteType" class="input-block form-control">
							<option value="owner">Owner</option>
							<option value="coowner">Co-Owner</option>
							<option value="view-only">View Only</option>
							<option value="editor">Editor</option>
						</select>
					</form-group>
				</div>
				<div class="col col-12">
					<transition-slide>
						<form-group v-show="notifyPeople">
							<textarea
								v-model="inviteMessage"
								class="input-block form-control"
								placeholder="Add a message"
								:disabled="!notifyPeople || sending"
								rows="8"
							/>
						</form-group>
					</transition-slide>
					<toggle-switch
						v-model="notifyPeople"
						label="Notify people"
						off-label="Notify people"
						class="mb-default"
					/>
				</div>
			</div>
			<p class="text-right">
				<a href="#" @click.prevent="returnMode" class="button button-link">Cancel</a>
				<a href="#" @click.prevent="sendInvites" class="button button-primary">Send</a>
			</p>
		</div>

		<div class="mode-embed" v-show="mode === 'embed'">
			<div class="mb-default">
				<a href="#" class="button button-link button-back" @click.prevent="returnMode">
					<i class="fas fa-fw fa-arrow-left icon" /> Share this tool
				</a>
			</div>
			<graded-worksheet-embed-options :worksheet="worksheet" />
		</div>
	</div>
</template>

<script>
	import md5 from 'md5';
	import worksheet from '@/components/Worksheet/Worksheet';

	export default {
		name: 'Sharing',
		props: {
			worksheet: {
				type: Object,
				required: true,
			},
		},
		data: () => ({
			mode: 'default',
			notifyPeople: true,
			guestShare: false,
			badEmail: false,
			people: [],
			options: [],
			invitees: [],
			inviteType: 'owner',
			inviteMessage: '',
			sending: false,
		}),
		mounted() {
			// iterating users in worksheet
			for(const user of this.worksheet.users) {
				console.log('user', user);
				this.invitees.push({
					name: 'Worksheet Invitee',
					email: user.options.email,
					type: user.options.invite_type,
				});
			}
			console.log(this.worksheet.users);
		},
		computed: {},
		methods: {
			stringToColour(str) {
				let i;
				let hash = 0;
				for(i = 0; i < str.length; i++) {
					hash = str.charCodeAt(i) + ((hash << 5) - hash);
				}
				let colour = '';
				for(i = 0; i < 3; i++) {
					const value = (hash >> (i * 8)) & 0xFF;
					colour += ('00' + value.toString(16)).substr(-2);
				}
				return colour;
			},
			getContrastColor(color) {
				// get black or white depending on the contrast of the hex color
				const r = parseInt(color.substr(1, 2), 16);
				const g = parseInt(color.substr(3, 2), 16);
				const b = parseInt(color.substr(5, 2), 16);
				const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
				return (yiq >= 128) ? '000000' : 'FFFFFF';
			},
			getAvatar(email) {

				if(email) return `https://www.gravatar.com/avatar/${ this.toMd5(email) }?s=40&d=https://ui-avatars.com/api/${ email }/128/${ this.stringToColour(email) }/${ this.getContrastColor(this.stringToColour(email)) }`;
			},
			toMd5(email) {
				return md5(email);
			},
			modeEmail() {

				this.mode = 'email';
				setTimeout(() => {
					this.$refs.multiselect.$el.focus();
				}, 100);
			},
			checkInput(searchQuery) {
				// check if last character is a comma
				if(searchQuery.slice(-1) === ',') {
					// get searchQuery without the comma
					const email = searchQuery.slice(0, -1);
					this.addPerson(email);
				}
			},
			removeBadEmail() {
				this.badEmail = false;
			},
			addPerson(newTag) {
				// check if newTag is an email
				const re = /\S+@\S+\.\S+/;
				if(!re.test(newTag)) {
					this.badEmail = true;
					this.$refs.multiselect.deactivate();
					return;
				}
				const tag = {
					email: newTag,
				};
				this.people.push(tag);
				this.options.push(tag);
				this.$refs.multiselect.$el.focus();
			},
			removePerson(removedTag) {
				this.people.splice(this.people.findIndex(p => p.email === removedTag), 1);
			},
			returnMode() {
				this.mode = 'default';
			},
			async copy(text, message = 'Copied to clipboard, sweet!') {
				try {
					await this.$copyText(text);

					this.$notify({
						group: 'graded',
						title: 'Copied!',
						text: message,
					});

				} catch(e) {
					console.error(e);
				}
			},

			async sendInvites() {

				const emails = this.people.map(person => person.email);

				this.sending = true;

				if(emails.length === 0) {

					this.$notify({
						group: 'graded',
						type: 'error',
						title: 'Cannot send',
						text: 'Please enter at least one email address.',
					});
					this.sending = false;
					return;
				}

				const response = await this.$axios.$post(`/worksheets/${ this.worksheet.id }/email-invites`, {
					emails,
					message: this.inviteMessage,
					invite_type: this.inviteType,
				});

				if(response.status === 200) {

					let newInvitees = this.$shallow(this.people);
					for(let i = 0; i < newInvitees.length; i++) {
						newInvitees[i].name = 'Worksheet Invitee';
						newInvitees[i].type = this.inviteType;
					}

					// merge new invitees with existing invitees
					this.invitees = this.invitees.concat(newInvitees);

					this.people = [];
					this.options = [];
					this.inviteMessage = '';
					this.mode = 'default';

					this.$notify({
						group: 'graded',
						title: 'Invites sent!',
						text: 'Your invites have been sent.',
					});
				}

				this.sending = false;
			},
		},
	};
</script>

<style scoped lang="less">

	.message {

		border: 2px solid @border-1;
		background: none;
	}

	.sharing-title {

		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: @margin-default;
		display: flex;
		align-items: center;

		img {

			margin-right: @margin-half;
			height: 20px;
		}
	}

	.sharing-subtitle {

		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: @margin-half;
	}

	.sharing-people {

		margin-bottom: @margin-default;
	}

	.sharing-actions {

		.sharing-action {

			display: flex;
			margin-bottom: @margin-default;
			align-items: center;

			svg {

				margin-right: @margin-half;
			}

			.button {

				min-width: 140px;
				margin-left: auto;
			}
		}
	}

	.help-block {

		color: @red-5;
		font-size: 0.8rem;
	}

	.button-back {

		padding-left: 0;
		padding-right: 0;

		.icon {

			margin-left: 0;
		}
	}

	/deep/ .multiselect {

		.multiselect__tags {

			border-color: var(--border-2);
			padding-left: 12px;
			min-height: 38px;
		}

		&.multiselect--active {

			.multiselect__tags {

				border-color: var(--border-3);
			}
		}

		.multiselect__placeholder {

			margin-bottom: 0 !important;
			padding-top: 0;
			line-height: 1;
		}
	}

	.people-wrapper {

		border-top: 1px solid @border-1;
		border-bottom: 1px solid @border-1;
		margin-bottom: @margin-default;
		padding: @margin-default;
		max-height: 200px;
		overflow-y: auto;

		.person {

			display: flex;
			align-items: center;

			.avatar {

				width: 40px;
			}

			&:not(:last-child) {

				margin-bottom: @margin-half;
				border-bottom: 1px solid @border-1;
				padding-bottom: @margin-half;
			}

			.media-body {

				p {

					font-size: 0.8rem;
				}
			}

			.form-group {

				margin-left: auto;
			}
		}
	}

	.empty-state {

		text-align: center;

		img {

			margin: 0 auto;
			width: 100px;
		}
	}

</style>