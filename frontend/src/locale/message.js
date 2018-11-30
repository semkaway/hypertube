const messages = {
	en: {
		validation:{
			required: 'This field is required',
			firstName: 'Must be at least 3 characters long',
			email: 'Must be a valid email',
			password: 'Must be at least 8 characters long',
			invalidEmail: 'Invalid email',
			invalidPassword: 'Invalid password',
			repeatPassword: 'Passwords don\'t match',
			serverError: 'User with this email already exists',
			notActivated: 'User is not activated'
		},
		button: {
			home: "Home",
			login: "login",
			register: "register",
			submit: "submit",
			reset: "reset",
			forgot_password: 'forgot password',
			send: 'send',
			profile: 'profile',
			send_activation_link: 'send activation link',
			logout: 'log out',
			language: 'language',
			save: 'save',
			delete: 'delete',
			cancel: 'cancel'
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
														<p>&#10003 Only latin letters</p>
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
			new_success_title: "Your new email is verified",
			error_title: "Registration was not confirmed",
			error_alert: 'Ooopsie, something went wrong.',
      invalid_alert: 'Something went wrong with your data.',
		},
		login: {
			title: "Login",
			email: 'Email',
			password: 'Password',
			omniauth_text: 'Via your social networks',
			go_to_register: 'Don\'t have an account?',
			success_alert: 'You successfully logged in.',
			error_alert: 'Ooopsie, something went wrong.',
			wrong_pass_alert: 'Sorry, your password is incorrect',
			no_validation_alert: 'Sorry, your account is not validated.'
		},
		forgot_password: {
			title: "Restore password",
			message: "Forgot password?",
			success_alert: "Check your email to restore your password.",
			error_alert: "User with this email doesn't exist.",
			error_title: "Sorry, we cannot change your password right now.",
			restore_pass_success_title: "Success!",
			restore_pass_success_alert: "You can now log in with your new password."
		},
		profile: {
			profile_title: 'profile',
			settings_title: 'settings',
			success_alert: 'All good, your data was saved.',
			error_pass_alert: 'Looks like your old password is incorrect.',
			profile: {

			},
			settings: {
				change_password: 'Change password',
				change_email: 'Change email',
				email_pending: 'To change your email check activation on: ',
				change_info: 'Change personal info',
				change_picture: 'Change profile picture',
				enter_url: 'Please, enter the url of the picture',
				click: '...or click on an image below',
				add_media: 'Link social media accounts',
				old_password: 'Old password',
				new_password: 'New password',
				new_password_repeat: 'Repeat new password',
				create_email: 'Create email',
				create_pass: 'Create password',
				delete_account_title: 'Delete account',
				delete_account_text: `Are you sure you want to delete your account?
															This action is irreversible and you will lose all your data.`
			}
		},
	},
	ru: {
		validation:{
			required: 'Поле обязательно для заполнения',
			firstName: 'Не может быть короче 3 символов',
			email: 'Неверный формат email',
			password: 'Не может быть короче 8 символов',
			invalidEmail: 'Неправильный email',
			invalidPassword: 'Неправильный пароль',
			repeatPassword: 'Пароли не совпадают',
			serverError: 'Пользователь с таким email уже существует',
			notActivated: 'Пользователь не активирован'
		},
		button: {
			home: "главная",
			login: "войти",
			register: "регистрация",
			submit: "подтвердить",
			reset: "очистить",
			forgot_password: 'Я не помню свой пароль',
			send: 'отправить',
			profile: 'профиль',
			send_activation_link: 'отправить ссылку активации',
			logout: 'выйти',
			language: 'язык',
			save: 'сохранить',
			delete: 'удалить',
			cancel: 'отмена'
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
														<p>&#10003 Буквы только латинского алфавита</p>
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
			new_success_title: "Вы подтвердили свой новый email.",
			error_title: "Регистрация не подтверждена",
			error_alert: 'Ой. Что-то пошло не так.',
      invalid_alert: "К сожалению, произошла ошибка с Вашими данными.",
		},
		login: {
			title: "Войти",
			email: 'Email',
			password: 'Пароль',
			omniauth_text: 'Через социальные сети',
			go_to_register: 'Нет аккаунта?',
			success_alert: 'Вы успешно вошли в свой аккаунт.',
			wrong_pass_alert: 'Вы ввели неверный пароль.',
			no_validation_alert: 'Извините, Ваш аккаунт не подтвержден.',
			error_alert: 'Ой. Что-то пошло не так.'
		},
		forgot_password: {
			title: "Восстановить пароль",
			message: "Забыли пароль?",
			success_alert: "Проверьте почту для восстановления пароля.",
			error_alert: "Пользователя с таким email не существует.",
			error_title: "Извините, но сейчас мы не можем изменить Ваш пароль.",
			restore_pass_success_title: "Пароль успешно изменен",
			restore_pass_success_alert: "Теперь Вы сможете войти в свой аккаунт, используя новый пароль."
		},
		profile: {
			profile_title: 'профиль',
			settings_title: 'настройки',
			success_alert: 'Ваши данные были сохранены.',
			error_pass_alert: 'Похоже, Вы неверно ввели старый пароль.',
			profile: {

			},
			settings: {
				change_password: 'Изменить пароль',
				change_email: 'Изменить email',
				email_pending: 'Для изменения email активируйте его на: ',
				change_info: 'Изменить персональные данные',
				change_picture: 'Изменить фото профиля',
				enter_url: 'Пожалуйста, введите url изображения',
				click: '...или нажмите на фото внизу',
				add_media: 'Добавить социальные сети',
				old_password: 'Старый пароль',
				new_password: 'Новый пароль',
				new_password_repeat: 'Повторите новый пароль',
				create_email: 'Создать email',
				create_pass: 'Создать пароль',
				delete_account_title: 'Удалить аккаунт',
				delete_account_text: 'Вы уверены? Вы не сможете отменить это действие. Все Ваши данные будут утеряны.'
			}
		},
	},
	uk: {
		validation:{
			required: 'Поле обов\'язкове для заповнення',
			firstName: 'Не може бути менше ніж 3 символи',
			email: 'Помилковий формат email',
			password: 'Не може бути менше ніж 8 символів',
			invalidEmail: 'Неправильний email',
			invalidPassword: 'Неправильний пароль',
			repeatPassword: 'Паролі не співпадають',
			serverError: 'Користувач з таким email вже існує',
			notActivated: 'Користувач не активований'
		},
		button: {
			home: "головна",
			login: "увійти",
			register: "реєстрація",
			submit: "підтвердити",
			reset: "очистити",
			forgot_password: "Я не пам'ятаю свій пароль",
			send: 'надіслати',
			profile: 'профіль',
			send_activation_link: 'надіслати посилання активації',
			logout: 'вийти',
			language: 'мова',
			save: 'зберегти',
			delete: 'видалити',
			cancel: 'скасувати'
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
														<p>&#10003 Літери тільки латинського алфавіту</p>
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
			new_success_title: "Вы підтвердили свій новий email.",
			error_title: "Реєстрацію не підтверджено",
			error_alert: 'Ой. Щось пішло не так.',
      invalid_alert: "Нажаль, сталась помилка, пов'язана з Вашими даними.",
		},
		login: {
			title: "Увійти",
			email: 'Email',
			password: 'Пароль',
			omniauth_text: 'Через соціальні мережі',
			go_to_register: 'Немає акаунта?',
			success_alert: 'Ви успішно увійшли до свого акаунту.',
			wrong_pass_alert: 'Неправильний пароль.',
			no_validation_alert: 'Активуйте свій акаунт, будь ласка.',
			error_alert: 'Ой. Щось пішло не так.'
		},
		forgot_password: {
			title: "Відновити пароль",
			message: "Забули пароль?",
			success_alert: "Перевірте пошту для відновлення пароля.",
			error_alert: "Користувача з таким email не існує.",
			error_title: "Вибачте, але зараз ми не можемо змінити Ваш пароль.",
			restore_pass_success_title: "Пароль успішно оновлено",
			restore_pass_success_alert: "Тепер Ви можете увійти в свій акаунт, використовуючи новий пароль."
		},
		profile: {
			profile_title: 'профіль',
			settings_title: 'налаштування',
			success_alert: 'Ваші дані було збережено.',
			error_pass_alert: 'Здається, Ви неправильно ввели старий пароль.',
			profile: {

			},
			settings: {
				change_password: 'Змінити пароль',
				change_email: 'Змінити email',
				email_pending: 'Для зміни email активуйте його на: ',
				change_info: 'Змінити персональні дані',
				change_picture: 'Змінити фото профіля',
				enter_url: 'Будь ласка, введіть url зображення',
				click: '...або натисніть на фото нижче',
				add_media: 'Додати соціальні мережі',
				old_password: 'Старий пароль',
				new_password: 'Новий пароль',
				new_password_repeat: 'Повторіть новий пароль',
				create_email: 'Створити email',
				create_pass: 'Створити пароль',
				delete_account_title: 'Видалити акаунт',
				delete_account_text: 'Ви впевнені? Ви не зможете відмінити цю дію. Всі Ваші дані будуть втрачені.'
			}
		},
	}
}

export default messages
