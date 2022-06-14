<template>
	<div>

		<div class="bg-gray-100 w-full">
			<div class="w-full mx-auto py-16">

				<h1 class="text-3xl text-center font-bold mb-6">
					Buttons
				</h1>

				<div class="bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md flex items-center">
					<div class="w-full text-center mx-auto">

						<button
							type="button"
							class="border border-green-500 bg-green-500 text-white px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
						>
							Default Button
						</button>

						<button
							type="button"
							class="border border-gray-300 bg-transparent text-black hover:text-white px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
						>
							Ghost Button
						</button>

					</div>
				</div>

				<h1 class="text-3xl text-center font-bold mb-6">
					Inputs
				</h1>

				<div class="bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md">

					<label for="input-group-1" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Default Input</label>
					<div class="relative mb-6">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
						</div>
						<input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-600 block w-full pl-10 p-2.5" placeholder="name@flowbite.com">
					</div>

					<label for="input-group-1" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Default Input</label>
					<div class="relative mb-1">
						<input type="text" class="bg-gray-50 border border-red-500 text-red-500 focus:ring-green-500 focus:border-green-600 block w-full p-2.5" placeholder="name@flowbite.com">
					</div>
					<p class="text-red-500 mb-6 text-sm">Please enter your email address in format user@mail.com</p>


					<label for="website-admin" class="block mb-2 font-medium text-gray-900 dark:text-gray-300">Input group</label>
					<div class="flex">
						<span class="inline-flex items-center px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
							@
						</span>
						<input type="text" class="rounded-none bg-gray-50 border text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full border-gray-300 p-2.5" placeholder="elonmusk">
					</div>

				</div>

				<h1 class="text-3xl text-center font-bold mb-6">
					User Menu
				</h1>

				<div class="bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md">

					<div class="flex justify-center">
						<div class="relative inline-block mb-20">
							<!-- Dropdown toggle button -->
							<button class="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none">
								<span class="mx-1">Rodrigo Tejero</span>
								<svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
								</svg>
							</button>

							<!-- Dropdown menu -->
							<div class="relative right-0 z-20 w-56 py-2 mt-2 pb-0 overflow-hidden bg-white shadow-xl dark:bg-gray-800">
								<a href="#" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
									<img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="https://apiv2.growthinstitute.com/users/avatar/6387" alt="jane avatar">
									<div class="mx-1">
										<h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200">Rodrigo Tejero</h1>
										<p class="text-sm text-gray-500 dark:text-gray-400">rodrigo@smartifact.com</p>
									</div>
								</a>

								<hr class="border-gray-200 dark:border-gray-700 ">

								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									view profile
								</a>

								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									Settings
								</a>

								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									My Worksheets
								</a>

								<hr class="border-gray-200 dark:border-gray-700 ">

								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									Create New Worksheet
								</a>

								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									Team
								</a>

								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									Invite colleagues
								</a>

								<hr class="border-gray-200 dark:border-gray-700 ">

								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									Help
								</a>
								<a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 dark:hover:text-white">
									Sign Out
								</a>
							</div>
						</div>
					</div>
				</div>

				<h1 class="text-3xl text-center font-bold mb-6">
					Modal
				</h1>

				<div class="bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md">

					<div class="relative flex justify-center items-center">
						<div id="menu" class="w-full h-full bg-gray-900 bg-opacity-80 top-0 sticky-0">
							<div class="2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
								<div class="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
									<div class="mt-12">
										<h1 role="main" class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">Your worksheet is ready</h1>
									</div>
									<div class="mt">
										<p class="mt-6 sm:w-80 text-base dark:text-white leading-7 text-center text-gray-800">Yey! Now do another!</p>
									</div>
									<button class="w-full dark:text-gray-800 dark:hover:bg-green-500 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-green-600 hover:bg-green-800">Create new worksheet</button>
									<a href="javascript:void(0)" class="mt-6 dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">Nope.. I am good</a>
									<button onclick="showMenu(true)" class="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 6L6 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
											<path d="M6 6L18 18" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<h1 class="text-3xl text-center font-bold mb-6">
					Form Example
				</h1>

				<div class="bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md">

					<div class="mx-auto w-full max-w-[550px]">
						<form>
							<div class="mb-5">
								<label
									for="name"
									class="mb-3 block text-base font-medium"
								>
									Full Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Full Name"
									class="rounded-none bg-gray-50 border text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full border-gray-300 p-2.5"
								/>
							</div>
							<div class="mb-5">
								<label
									for="email"
									class="mb-3 block text-base font-medium"
								>
									Email Address
								</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="example@domain.com"
									class="rounded-none bg-gray-50 border text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full border-gray-300 p-2.5"
								/>
							</div>
							<div class="mb-5">
								<label
									for="subject"
									class="mb-3 block text-base font-medium"
								>
									Subject
								</label>
								<input
									type="text"
									name="subject"
									id="subject"
									placeholder="Enter your subject"
									class="rounded-none bg-gray-50 border text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full border-gray-300 p-2.5"
								/>
							</div>
							<div class="mb-5">
								<label
									for="message"
									class="mb-3 block text-base font-medium"
								>
									Message
								</label>
								<textarea
									rows="4"
									name="message"
									id="message"
									placeholder="Type your message"
									class="rounded-none bg-gray-50 border text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full border-gray-300 p-2.5"
								></textarea>
							</div>
							<div>
								<button
									class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
								>
									Submit
								</button>
							</div>
						</form>
					</div>

				</div>



				<h1 class="text-3xl text-center font-bold mb-6">
					Login Social
				</h1>

				<div class="bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md">
					<div class="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
			<div class="bg-white shadow-xl">
				<div class="p-6 sm:p-16">
					<div class="space-y-4">
						<svg class="w-1/4 h-20" width="446" height="386" viewBox="0 0 446 386" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_2_14098)">
							<path d="M0.000137329 0H445.385V386H0.000137329V0Z" fill="#222525"/>
							<rect x="29.6889" y="29.6934" width="386" height="326.615" fill="white"/>
							<rect x="222.693" y="29.6924" width="14.8462" height="356.308" fill="#222525"/>
							<rect x="118.769" y="222.692" width="14.8462" height="74.2308" fill="#222525"/>
							<rect x="118.769" y="89.0771" width="14.8462" height="74.2308" fill="#222525"/>
							<rect x="133.616" y="148.462" width="193" height="14.8462" fill="#222525"/>
							<rect x="326.616" y="296.923" width="74.2308" height="14.8462" transform="rotate(-90 326.616 296.923)" fill="#222525"/>
							<rect x="29.6926" y="222.692" width="89.0769" height="14.8462" fill="#222525"/>
							<rect x="326.616" y="163.308" width="74.2308" height="14.8462" transform="rotate(-90 326.616 163.308)" fill="#222525"/>
							</g>
							<defs>
							<clipPath id="clip0_2_14098">
							<rect width="445.385" height="386" fill="white"/>
							</clipPath>
							</defs>
						</svg>
						<h2 class="mb-6 text-2xl text-cyan-900 font-bold text-green-600">Sign in to access the best on worksheets.</h2>
					</div>
					<div class="mt-10 grid space-y-4">
						<button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-green-400 focus:bg-green-50 active:bg-green-100">
							<div class="relative flex items-center space-x-4 justify-center">
								<img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" class="absolute left-0 w-5" alt="google logo">
								<span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-green-600 sm:text-base">Continue with Google</span>
							</div>
						</button>
						<button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-green-400 focus:bg-green-50 active:bg-green-100">
							<div class="relative flex items-center space-x-4 justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
									<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
								</svg>
								<span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-green-600 sm:text-base">Continue with Github</span>
							</div>
						</button>
						<button class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300
									 hover:border-green-400 focus:bg-green-50 active:bg-green-100">
							<div class="relative flex items-center space-x-4 justify-center">
								 <img src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg" class="absolute left-0 w-5" alt="Facebook logo">
								<span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-green-600 sm:text-base">Continue with Facebook</span>
							</div>
						</button>
					</div>

					<div class="mt-16 space-y-4 text-gray-600 text-center sm:-mb-8">
						<p class="text-xs">By proceeding, you agree to our <a href="#" class="underline">Terms of Use</a> and confirm you have read our <a href="#" class="underline">Privacy and Cookie Statement</a>.</p>
						<p class="text-xs">This site is protected by reCAPTCHA and the <a href="#" class="underline">Google Privacy Policy</a> and <a href="#" class="underline">Terms of Service</a> apply.</p>
					</div>
				</div>
			</div>
		</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

</script>