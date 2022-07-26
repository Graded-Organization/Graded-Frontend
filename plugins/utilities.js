export default (context, inject) => {
	const shallow = (value) => JSON.parse(JSON.stringify(value));
	inject('shallow', shallow);
}