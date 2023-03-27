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
					@focus="mode = 'email'"
					placeholder="johndoe@gmail.com, janedoe@outlook.com"
				/>
			</form-group>

			<div class="sharing-people">
				<h3 class="sharing-subtitle">People with access</h3>

				<toggle-switch
					v-model="guestShare"
					label="Allow guests to share this tool with others"
					off-label="Allow guests to share this tool with others"
				/>
			</div>
			<div class="sharing-actions">
				<h3 class="sharing-subtitle">Other sharing methods</h3>
				<div class="sharing-action">
					<span>Share a link to invite users</span>
					<a href="#" class="button button-secondary">Copy Link</a>
				</div>

				<div class="sharing-action">
					<span>Embed this tool on a website</span>
					<a href="#" @click.prevent="mode = 'embed'" class="button button-secondary">Get Embed Code</a>
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
							v-model="people"
							:options="options"
							:taggable="true"
							:multiple="true"
							label="email"
							placeholder="Type an email to invite someone"
							@open="removeBadEmail"
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
						<select class="input-block form-control">
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
								class="input-block form-control"
								placeholder="Add a message"
								:disabled="!notifyPeople"
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
				<a href="#" class="button button-primary">Send</a>
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
		}),
		computed: {},
		methods: {
			removeBadEmail() {
				this.badEmail = false;
			},
			addPerson(newTag) {

				// check if newTag is an email
				const re = /\S+@\S+\.\S+/;
				if(!re.test(newTag)) {
					this.badEmail = true;
					return;
				}

				const tag = {
					email: newTag,
				};
				this.people.push(tag);
				this.options.push(tag);
			},
			removePerson(removedTag) {
				this.people.splice(this.people.indexOf(removedTag), 1);
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

</style>