const messages = {
	en: {
		validation:{
			required: 'This field is required',
			firstNameShort: 'Must be at least 3 characters long',
			firstNameLong: 'Can\'t be more than 15 characters',
			firstNameFormat: 'Can contain only letters',
			email: 'Must be a valid email',
			password: 'Must be at least 8 characters long',
			passwordHint: 'Min 8 characters, one digit, one uppercase and one lowercase letter',
			wrongFormat: 'Invalid password format',
			invalidEmail: 'Invalid email',
			invalidPassword: 'Invalid password',
			repeatPassword: 'Passwords don\'t match',
			serverError: 'User with this email already exists',
			notActivated: 'User is not activated'
		},
		genres: {
			action: "Action",
	    adventure: "Adventure",
	    animation: "Animation",
	    comedy: "Comedy",
	    crime: "Crime",
	    documentary: "Documentary",
	    drama: "Drama",
	    family: "Family",
	    fantasy: "Fantasy",
	    history: "History",
	    horror: "Horror",
	    music: "Music",
	    mystery: "Mystery",
	    romance: "Romance",
	    scienceFiction: "Science Fiction",
	    tvMovie: "TV Movie",
	    thriller: "Thriller",
	    war: "War",
	    western: "Western"
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
			language: 'Language',
			save: 'save',
			delete: 'delete',
			cancel: 'cancel',
			close: 'close',
			showMore: 'Show more',
			comingSoon: 'Coming soon',
			notComing: 'Sorry, this movie is not available',
			watchIn: 'Watch in'
		},
		home: {
			title: 'home',
			subtitle: 'Get comfortable. It\'s time to watch a movie.',
			title1: 'WATCH YOUR FAVORITE MOVIES ONLINE!',
			quality: 'Different quality - 720p/1080p',
			language: 'Three interface languages',
			subtitles: 'English and Russian subtitles',
			title2: 'MADE WITH MODERN TECHNOLOGIES',
			title3: 'COMPLETELY OPEN SOURCE PROJECT',
			sources: 'Sources',
			contributor: 'Contributors'
		},
		movies: {
			notFound: 'Sorry, nothing was found :(',
			search: 'Search',
			filter: 'Filter by',
			popularity: 'Popularity',
			releaseDate: 'Release date',
			voteNumber: 'Number of votes',
			rating: 'Rating',
			since: 'since',
			to: 'to'
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
			no_validation_alert: 'Sorry, your account is not validated.',
			doubleValidation: 'Sorry, this email has already been activated.',
			resendLink: 'Resend activation link'
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
				commented: 'Commented movies',
				watched: 'Watched movies'
			},
			settings: {
				change_password: 'Change password',
				change_email: 'Change email',
				active_email: 'Active email',
				email_pending: 'To change your email check activation on: ',
				change_info: 'Change personal info',
				change_picture: 'Change profile picture',
				pictureError: 'Your image is not valid',
				enter_url: 'Please, enter the url of the picture',
				click: 'Or click on an image below',
				add_media: 'Link social media accounts',
				added_media: 'Added social media',
				userExists: 'Sorry, this user already exists',
				old_password: 'Old password',
				new_password: 'New password',
				new_password_repeat: 'Repeat new password',
				create_email: 'Create email',
				create_pass: 'Create password',
				change_language: 'Change language',
				delete_account_title: 'Delete account',
				delete_account_text: `Are you sure you want to delete your account?
															This action is irreversible and you will lose all your data.`
			}
		},
		movie: {
			duration: 'Duration',
			min: 'min',
			rating: 'Rating',
			genres: 'Genres',
			year: 'Year',
			crew: 'Crew',
			cast: 'Cast',
			similar: 'Similar movies',
			newComment: 'New comment'
		},
		notFound: {
			text: 'Well, this is unpleasant. Let\'s just pretend you didn\'t see it.'
		}
	},
	ru: {
		validation:{
			required: 'Поле обязательно для заполнения',
			firstNameShort: 'Не может быть короче 3 символов',
			firstNameLong: 'Не может быть больше 15 символов',
			firstNameFormat: 'Может содержать только буквы',
			email: 'Неверный формат email',
			password: 'Не может быть короче 8 символов',
			wrongFormat: 'Неправильный формат пароля',
			passwordHint: 'Минимум 8 символов, одна цифра, одна большая и одна маленькая буква',
			invalidEmail: 'Неправильный email',
			invalidPassword: 'Неправильный пароль',
			repeatPassword: 'Пароли не совпадают',
			serverError: 'Пользователь с таким email уже существует',
			notActivated: 'Пользователь не активирован'
		},
		genres: {
			action: "Боевик",
	    adventure: "Приключения",
	    animation: "Мультфильм",
	    comedy: "Комедия",
	    crime: "Криминал",
	    documentary: "Документальный",
	    drama: "Драма",
	    family: "Семейный",
	    fantasy: "Фэнтези",
	    history: "История",
	    horror: "Ужасы",
	    music: "Музыка",
	    mystery: "Детектив",
	    romance: "Мелодрама",
	    scienceFiction: "Фантастика",
	    tvMovie: "Телевизионный фильм",
	    thriller: "Триллер",
	    war: "Военный",
	    western: "Вестерн"
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
			language: 'Язык',
			save: 'сохранить',
			delete: 'удалить',
			cancel: 'отмена',
			close: 'закрыть',
			showMore: 'Показать еще',
			comingSoon: 'Скоро в кино',
			notComing: 'К сожалению, этот фильм недоступен',
			watchIn: 'Смотреть в'
		},
		home: {
			title: 'Главная',
			subtitle: 'Устраивайтесь поудобнее. Пора посмотреть фильм.',
			title1: 'Смотри любимые фильмы онлайн!',
			quality: 'Доступные разрешения: 720p/1080p',
			language: 'Три языка интерфейса',
			subtitles: 'Субтитры на английском и русском',
			title2: 'Создан с использованием современных технологий',
			title3: 'Полностью открытый исходный код',
			sources: 'Источники',
			contributor: 'Контрибьюторы'
		},
		movies: {
			notFound: 'Извините, мы ничего не нашли по Вашему запросу :(',
			search: 'Поиск',
			filter: 'Фильтры',
			popularity: 'Популярность',
			releaseDate: 'Дата выхода',
			voteNumber: 'Количество голосов',
			rating: 'Оценка',
			since: 'от',
			to: 'до'
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
			doubleValidation: 'Извините, этот email уже был активирован.',
			resendLink: 'Отправить письмо активации',
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
				commented: 'Прокомментированные фильмы',
				watched: 'Просмотренные фильмы'
			},
			settings: {
				change_password: 'Изменить пароль',
				change_email: 'Изменить email',
				active_email: 'Активный email',
				email_pending: 'Для изменения email активируйте его на: ',
				change_info: 'Изменить персональные данные',
				change_picture: 'Изменить фото профиля',
				pictureError: 'Неправильный формат изображения',
				enter_url: 'Пожалуйста, введите url изображения',
				click: 'Или нажмите на фото внизу',
				add_media: 'Добавить социальные сети',
				added_media: 'Добавленные социальные сети',
				userExists: 'Извините, этот пользователь уже существует',
				old_password: 'Старый пароль',
				new_password: 'Новый пароль',
				new_password_repeat: 'Повторите новый пароль',
				create_email: 'Создать email',
				create_pass: 'Создать пароль',
				change_language: 'Изменить язык',
				delete_account_title: 'Удалить аккаунт',
				delete_account_text: 'Вы уверены? Вы не сможете отменить это действие. Все Ваши данные будут утеряны.'
			}
		},
		movie: {
			duration: 'Длительность',
			min: 'мин',
			rating: 'Рейтинг',
			genres: 'Жанры',
			year: 'Год',
			crew: 'Команда',
			cast: 'Актеры',
			similar: 'Похожие фильмы',
			newComment: 'Новый комментарий'
		},
		notFound: {
			text: 'Хм, вот это неприятность. Давайте сделаем вид, что Вы этого не видели.'
		}
	},
	uk: {
		validation:{
			required: 'Поле обов\'язкове для заповнення',
			firstNameShort: 'Не може бути менше ніж 3 символи',
			firstNameLong: 'Не може бути більше ніж 15 символів',
			firstNameFormat: 'Може містити тільки літери',
			email: 'Помилковий формат email',
			password: 'Не може бути менше ніж 8 символів',
			wrongFormat: 'Помилковий формат пароля',
			passwordHint: 'Мінімум 8 символів, одна цифра, одна велика та одна маленька літера',
			invalidEmail: 'Неправильний email',
			invalidPassword: 'Неправильний пароль',
			repeatPassword: 'Паролі не співпадають',
			serverError: 'Користувач з таким email вже існує',
			notActivated: 'Користувач не активований'
		},
		genres: {
			action: "Бойовик",
			adventure: "Пригоди",
			animation: "Мультфільм",
			comedy: "Комедія",
			crime: "Кримінал",
			documentary: "Документальний",
			drama: "Драма",
			family: "Сімейний",
			fantasy: "Фентезі",
			history: "Історичний",
			horror: "Жахи",
			music: "Музика",
			mystery: "Детектив",
			romance: "Мелодрама",
			scienceFiction: "Фантастика",
			tvMovie: "Телефільм",
			thriller: "Трилер",
			war: "Військовий",
			western: "Вестерн"
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
			language: 'Мова',
			save: 'зберегти',
			delete: 'видалити',
			cancel: 'скасувати',
			close: 'закрити',
			showMore: 'Показати ще',
			comingSoon: 'Скоро в кіно',
			notComing: 'Нажаль, цей фільм недоступний',
			watchIn: 'Дивитись у'
		},
		home: {
			title: 'Головна',
			subtitle: 'Влаштовуйтеся зручніше. Настав час подивитися фільм.',
			title1: 'Дивись улюблені фільми онлайн!',
			quality: 'Доступні у 720p та 1080p',
			language: 'Три мови інтерфейсу',
			subtitles: 'Субтитри англійською та російською',
			title2: 'Створений за домомогою сучасних технологій',
			title3: 'Повністю відкритий програмний код',
			sources: 'Джерела',
			contributor: 'Контрибьютори'
		},
		movies: {
			notFound: 'Вибачте, за Вашим запитом нічого не знайдено :(',
			search: 'Пошук',
			filter: 'Фільтри',
			popularity: 'Популярність',
			releaseDate: 'Дата виходу',
			voteNumber: 'Кількість голосів',
			rating: 'Оцінка',
			since: 'від',
			to: 'до'
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
			doubleValidation: 'Вибачте, цей email вже активовано.',
			resendLink: 'Надіслати лист активації',
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
				commented: 'Прокоментовані фільми',
				watched: 'Переглянуті фільми'
			},
			settings: {
				change_password: 'Змінити пароль',
				change_email: 'Змінити email',
				active_email: 'Активний email',
				email_pending: 'Для зміни email активуйте його на: ',
				change_info: 'Змінити персональні дані',
				change_picture: 'Змінити фото профіля',
				pictureError: 'Помилковий формат зображення',
				enter_url: 'Будь ласка, введіть url зображення',
				click: 'Або натисніть на фото нижче',
				add_media: 'Додати соціальні мережі',
				added_media: 'Додані соціальні мережі',
				userExists: 'Вибачте, цей користувач вже існує',
				old_password: 'Старий пароль',
				new_password: 'Новий пароль',
				new_password_repeat: 'Повторіть новий пароль',
				create_email: 'Створити email',
				create_pass: 'Створити пароль',
				change_language: 'Змінити мову',
				delete_account_title: 'Видалити акаунт',
				delete_account_text: 'Ви впевнені? Ви не зможете відмінити цю дію. Всі Ваші дані будуть втрачені.'
			}
		},
		movie: {
			duration: 'Тривалість',
			min: 'хв',
			rating: 'Рейтинг',
			genres: 'Жанри',
			year: 'Рік',
			crew: 'Команда',
			cast: 'Актори',
			similar: 'Схожі фільми',
			newComment: 'Новий коментар',
		},
		notFound: {
			text: 'Оце так неприємність. Давайте зробимо вигляд, що Ви цього не бачили.'
		}
	}
}

export default messages
