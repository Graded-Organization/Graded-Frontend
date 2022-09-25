<template>
	<div class="unsplash-search">
		<form-group label="Search any keyword to get sweet images">
			<div>
				<input
					v-model="searchTerm"
					@input="debouncedOnChange"
					type="text"
					class="input-block form-control"
					placeholder="Enter a search term"
				>
				<transition name="fade">
					<a v-show="searchTerm" class="clear" @click.prevent="searchTerm = ''" href="#"><i class="fal fa-fw fa-times" /></a>
				</transition>
			</div>
		</form-group>

		<vue-masonry-wall v-if="searchResults" :options="{ padding: 7.5 }" :items="searchResults">
			<template v-slot:default="{ item }">
				<div class="result">
					<img
						@click="returnImage(item.urls.regular)"
						:src="item.urls.regular"
						:alt="item.alt_description"
						loading="lazy"
					>
					<p>{{ item.alt_description || 'No description 🙈' }}</p>
				</div>
			</template>
		</vue-masonry-wall>

	</div>
</template>

<script>
	import VueMasonryWall from "vue-masonry-wall";
	import _debounce from 'lodash.debounce';

	export default {
		name: 'UnsplashSearch',
		components: { VueMasonryWall },
		data: () => ({
			source: null,
			searchTerm: '',
			searchResults: null
		}),
		computed: {
			debouncedOnChange() {
				return _debounce(this.search, 700);
			}
		},
		methods: {
			returnImage(url) {

				console.log(url);
				this.$emit('image-selected', url);
			},
			async search() {

				this.searchResults = null;

				if(!!this.source) this.source.cancel('User typed another char');
				if(this.searchTerm.length >= 3) {

					this.source = this.$axios.CancelToken.source();

					try {

						const res = await this.$axios.$get(`unsplash/search?query=${ this.searchTerm }`, {
							cancelToken: this.source.token
						});

						this.searchResults = res.data;

					} catch (e) {}
				}
			},
		}
	}
</script>

<style scoped lang="less">

	.clear {

		position: absolute;
		top: 50%;
		margin-top: -25/2px;
		right: @margin-default;

		&:hover {

			color: @primary;
		}
	}

	.result {

		img {

			margin-bottom: @margin-half;
			cursor: pointer;

			&:hover {

				opacity: 0.5;
			}
		}

		p {

			font-size: @font-size-0;
		}
	}

</style>