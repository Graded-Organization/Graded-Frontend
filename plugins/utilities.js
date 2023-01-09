import parse from 'parse-css-color';

export default (context, inject) => {

	const randomString = function(
		length = 10,
		allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	) {
		let result = '';
		for (let i = 0; i < length; i++) {
			result += allowed.charAt(Math.floor(Math.random() * allowed.length));
		}
		return result;
	}
	inject('randomString', randomString);

	// Shallow copy

	const shallow = (value) => JSON.parse(JSON.stringify(value));
	inject('shallow', shallow);

	// Get contrast color (white or black)

	const contrastColor = function(background) {

		let color = parse(background);

		// Return light or dark class based on contrast calculation
		return ((color.values[0] * 0.299 + color.values[1] * 0.587 + color.values[2] * 0.114) > 186) ? 'contrast-black' : 'contrast-white';
	};
	inject('contrastColor', contrastColor);

	// Calculate Luminance

	const luminance = function(r, g, b) {
		var a = [r, g, b].map(function(v) {
			v /= 255;
			return v <= 0.03928 ?
			v / 12.92 :
			Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	}
	inject('luminance', luminance);

	// Calculate contrast

	const contrast = function(color1, color2) {

		let c1 = parse(color1);
		let c2 = parse(color2);

		let rgb1 = c1.values;
		let rgb2 = c2.values;

		var lum1 = this.$luminance(rgb1[0], rgb1[1], rgb1[2]);
		var lum2 = this.$luminance(rgb2[0], rgb2[1], rgb2[2]);
		var brightest = Math.max(lum1, lum2);
		var darkest = Math.min(lum1, lum2);
		return (brightest + 0.05) / (darkest + 0.05);
	}
	inject('contrast', contrast);

	const stringToColour = function(str) {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = '#';
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	}
	inject('stringToColour', stringToColour);
}