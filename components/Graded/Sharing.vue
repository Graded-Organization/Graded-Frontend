<template>
	<div class="sharing-wrapper">
		<h2 class="sharing-title">
			<img src="~/assets/images/template/transform-robot.svg" alt="Normie">
			Invite users to join this tool
		</h2>

		<div v-show="mode === 'default'">
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

		<div v-show="mode === 'email'">
			<div class="mb-default">
				<a href="#" @click.prevent="returnMode">
					<i class="fas fa-arrow-left" /> Share this tool
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
						></multiselect>
					</form-group>
					<transition-slide>
						<p class="help-block" v-if="badEmail">Please enter a valid email address.</p>
					</transition-slide>
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
					<toggle-switch
						v-model="notifyPeople"
						label="Notify people"
						off-label="Notify people"
						class="mb-default"
					/>
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
				</div>
			</div>
			<p class="text-right">
				<a href="#" @click.prevent="returnMode" class="button button-link">Cancel</a>
				<a href="#" class="button button-primary">Send</a>
			</p>
		</div>

		<div v-show="mode === 'embed'">
			<div class="mb-default">
				<a href="#" @click.prevent="returnMode">
					<i class="fas fa-arrow-left" /> Share this tool
				</a>
			</div>
			<div class="row">
				<div class="col col-4">

					<div class="m-default">
						<p class="mb-default">
							<toggle-switch
								v-model="embed.showHeader"
								label="Show Header"
								off-label="Hide Header"
							/>
						</p>

						<p class="mb-default ml-default" v-if="embed.showHeader">
							<toggle-switch
								v-model="embed.showSheetInfo"
								label="Show Worksheet Information"
								off-label="Hide Worksheet Information"
							/>
						</p>

						<p class="mb-default ml-default" v-if="embed.showHeader">
							<toggle-switch
								v-model="embed.showUserInfo"
								label="Show User Information"
								off-label="Hide User Information"
							/>
						</p>

						<p class="mb-default">
							<toggle-switch
								v-model="embed.showBranding"
								label="Show Branding"
								off-label="Hide Branding"
							/>
						</p>

						<p class="mb-default">
							<toggle-switch
								v-model="embed.showActions"
								label="Show Actions"
								off-label="Hide Actions"
							/>
						</p>
					</div>

				</div>
				<div class="col">

					<p class="text-right mb-default">

						<a
							class="button button-link button-small"
							@click.prevent="showPreview"
						><i class="icon fa-fw far fa-external-link-alt" /> Preview</a>

						<a
							@click.prevent="copy(embedCode)"
							v-tooltip.bottom="'Click to copy link'"
							class="button button-primary button-small"
						><i class="icon fa-fw fal fa-copy" /> Copy Embed</a>
					</p>

					<div class="code-wrapper">
						{{ embedCode }}
					</div>
				</div>
			</div>
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
			}
		},
		data: () => ({
			mode: 'default',
			notifyPeople: true,
			guestShare: false,
			badEmail: false,
			people: [],
			options: [],
			embed: {
				showHeader: true,
				showBranding: true,
				showSheetInfo: true,
				showUserInfo: true,
				showActions: true,
			},
		}),
		computed: {
			embedCode() {

				let params = {};

				if(!this.embed.showHeader) params['header'] = 0;
				if(!this.embed.showBranding) params['branding'] = 0;
				if(!this.embed.showSheetInfo) params['sheet_info'] = 0;
				if(!this.embed.showUserInfo) params['user_info'] = 0;
				if(!this.embed.showActions) params['actions'] = 0;

				let result = Object.values(params).length ? '?' + new URLSearchParams(params).toString() : '';

				return '<iframe class="graded-embed" src="' + `${ this.$config.baseUrl }/worksheet/embed/${ this.worksheet.uid }${ result }` + '" backgroundColor="gray" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>';
			},
		},
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

	.code-wrapper {

		border-radius: @radius-2;
		background: @background-9;
		color: white;
		word-break: break-all;
		font-family: monospace;
		padding: @margin-double;
	}

	.embeding-switch {

		&.is-active {

			border-bottom: 1px solid @border-1;
			padding-bottom: @margin-default;
			margin-bottom: @margin-default;
		}
	}

</style>