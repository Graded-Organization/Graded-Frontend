<template>
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
				<code v-highlight class="html">
					{{ embedCode }}
				</code>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GradedWorksheetEmbedOptions',
		props: {
			worksheet: {
				type: Object,
				required: true,
			},
		},
		data: () => ({
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
	.code-wrapper {

		border-radius: @radius-2;
		background: @background-9;
		color: white;
		word-break: break-all;
		font-family: monospace;
		padding: @margin-double;
	}

	.hljs {
		background: transparent;
	}
</style>