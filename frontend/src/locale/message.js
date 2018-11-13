const messages = {
	en: {
		button: {
			home: "Home",
			login: "login",
			register: "register",
			submit: "submit",
			reset: "reset",
			forgot_password: 'forgot password',
			send: 'send'
		},
		home: {
			title: 'home'
		},
		registration: {
			title: 'Registration',
			first_name: 'First name',
			last_name: 'Last name',
			email: 'Email',
			password: 'Password',
			repeat_password: 'Repeat password',
			password_hint: `<b-row>
												<b-col></b-col>
												<b-col>
													<div class="float-lg-left text-left">
														<p>&#10003 8 characters minimum</p>
														<p>&#10003 One uppercase letter</p>
													</div>
													<div class="float-lg-right text-left">
														<p>&#10003 One lowercase letter</p>
														<p>&#10003 One digit</p>
													</div>
												</b-col>
												<b-col></b-col>
											</b-row>`,
			omniauth_text: 'Via your social networks',
			account_exists: 'Already have an account?',
			emailExists: 'Sorry, user with this email already exists.',
			success_alert: 'Activation link was sent to your email.',
			error_alert: 'Ooopsie, something went wrong.'
		},
		activation: {
			success_title: "Registration confirmed",
			success_alert: "You are now registered and can log in to your account",
			error_title: "Registration was not confirmed",
			error_alert: 'Ooopsie, something went wrong.',
      invalid_alert: 'Something went wrong with your data.',
      redirect_error_text: "You will be redirected to the home page in ",
			redirect_success_text: "You will be redirected to the login page in ",
      redirect_seconds: " seconds."
		},
		login: {
			title: "Login",
			email: 'Email',
			password: 'Password',
			omniauth_text: 'Via your social networks',
			go_to_register: 'Don\'t have an account?',
			success_alert: 'You successfully logged in.',
			error_alert: 'Ooopsie, something went wrong.'
		},
		forgot_password: {
			title: "Restore password",
			message: "Forgot password?",
			alert: "Check your email to restore your password.",
			error_title: "Sorry, we cannot change your password right now."
		},
	},
	ru: {
		button: {
			home: "главная",
			login: "войти",
			register: "регистрация",
			submit: "подтвердить",
			reset: "очистить",
			forgot_password: 'Я не помню свой пароль',
			send: 'отправить'
		},
		home: {
			title: 'Главная'
		},
		registration: {
			title: "Регистрация",
			first_name: 'Имя',
			last_name: 'Фамилия',
			email: 'Email',
			password: 'Пароль',
			repeat_password: 'Повторите пароль',
			password_hint: `<b-row>
												<b-col></b-col>
												<b-col>
													<div class="float-lg-left text-left">
														<p>&#10003 Минимум 8 символов</p>
														<p>&#10003 Одна заглавная буква</p>
													</div>
													<div class="float-lg-right text-left">
														<p>&#10003 Одна строчная буква</p>
														<p>&#10003 Одна цифра</p>
													</div>
												</b-col>
												<b-col></b-col>
											</b-row>`,
			omniauth_text: 'Через социальные сети',
			account_exists: 'Уже есть аккаунт?',
			emailExists: 'Извините, пользователь с данным email уже существует.',
			success_alert: 'Отлично! Ссылка для активации отправлена на Ваш email.',
			error_alert: 'Ой. Что-то пошло не так.'
		},
		activation: {
			success_title: "Регистрация подтверждена",
			success_alert: "Вы успешно подтвердили регистрацию и теперь можете войти в свой аккаунт.",
			error_title: "Регистрация не подтверждена",
			error_alert: 'Ой. Что-то пошло не так.',
      invalid_alert: "К сожалению, произошла ошибка с Вашими данными.",
      redirect_error_text: "Вас перенаправят на главную страницу через ",
      redirect_success_text: "Вас перенаправят на страницу входа через ",
      redirect_seconds: " секунд."
		},
		login: {
			title: "Войти",
			email: 'Email',
			password: 'Пароль',
			omniauth_text: 'Через социальные сети',
			go_to_register: 'Нет аккаунта?',
			success_alert: 'Вы успешно вошли в свой аккаунт.',
			error_alert: 'Ой. Что-то пошло не так.'
		},
		forgot_password: {
			title: "Восстановить пароль",
			message: "Забыли пароль?",
			alert: "Проверьте почту для восстановления пароля.",
			error_title: "Извините, но сейчас мы не можем изменить Ваш пароль."
		},
	},
	ua: {
		button: {
			home: "головна",
			login: "увійти",
			register: "реєстрація",
			submit: "підтвердити",
			reset: "очистити",
			forgot_password: "Я не пам'ятаю свій пароль",
			send: 'надіслати'
		},
		home: {
			title: 'Головна'
		},
		registration: {
			title: "Реєстрація",
			first_name: "Ім'я",
			last_name: 'Прізвище',
			email: 'Email',
			password: 'Пароль',
			repeat_password: 'Повторіть пароль',
			password_hint: `<b-row>
												<b-col></b-col>
												<b-col>
													<div class="float-lg-left text-left">
														<p>&#10003 Мінімум 8 символів</p>
														<p>&#10003 Одна велика літера</p>
													</div>
													<div class="float-lg-right text-left">
														<p>&#10003 Одна маленька літера</p>
														<p>&#10003 Одна цифра</p>
													</div>
												</b-col>
												<b-col></b-col>
											</b-row>`,
			omniauth_text: 'Через соціальні мережі',
			account_exists: 'Вже маєте акаунт?',
			emailExists: 'Вибачте, користувач з таким email вже існує.',
			success_alert: 'Чудово! Лист з посиланням активації відправлено на Ваш email.',
			error_alert: 'Ой. Щось пішло не так.'
		},
		activation: {
			success_title: "Реєстрацію підтверджено",
			success_alert: "Ви успішно підтвердили свою реєстрацію та можете увійти до свого акаунту.",
			error_title: "Реєстрацію не підтверджено",
			error_alert: 'Ой. Щось пішло не так.',
      invalid_alert: "Нажаль, сталась помилка, пов'язана з Вашими даними.",
			redirect_error_text: "Вас буде перенаправлено на головну сторінку через ",
      redirect_success_text: "Вас буде перенаправлено на сторінку входу через ",
      redirect_seconds: " секунд."
		},
		login: {
			title: "Увійти",
			email: 'Email',
			password: 'Пароль',
			omniauth_text: 'Через соціальні мережі',
			go_to_register: 'Немає акаунта?',
			success_alert: 'Ви успішло увійшли до свого акаунту.',
			error_alert: 'Ой. Щось пішло не так.'
		},
		forgot_password: {
			title: "Відновити пароль",
			message: "Забули пароль?",
			alert: "Перевірте пошту для відновлення пароля.",
			error_title: "Вибачте, але зараз ми не можемо змінити Ваш пароль."
		},
	}
}

export default messages
