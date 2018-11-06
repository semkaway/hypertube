const messages = {
  en: {
    button: {
      home: "home",
      login: "log in",
      register: "register",
      submit: "submit",
      reset: "reset"
    },
    home: {
      title: 'home'
    },
    registration: {
      title: 'registration',
      first_name: 'First name',
      last_name: 'Last name',
      email: 'Email',
      password: 'Password',
      repeat_password: 'Repeat password',
      password_hint: `Include uppercase letters,
                      lowercase letters,
                      digits,
                      and be at least 8 characters long`,
      omniauth_text: 'via your social networks'
    },
    confirmation: {
      title: "registration confirmed",
      message: "You are now registered and can log in to your account"
    }
  },
  ru: {
    button: {
      home: "главная",
      login: "войти",
      register: "регистрация",
      submit: "подтвердить",
      reset: "очистить"
    },
    home: {
      title: 'главная'
    },
    registration: {
      title: "регистрация",
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Email',
      password: 'Пароль',
      repeat_password: 'Повторите пароль',
      password_hint: `Пароль должен содержать заглавные буквы, строчные буквы и цифры.
                      Он не может быть короче 8 символов`,
      omniauth_text: 'через социальные сети'
    },
    confirmation: {
      title: "регистрация подтверждена",
      message: "Вы успешно подтвердили регистрацию и теперь можете войти в свой аккаунт."
    }
  },
  ua: {
    button: {
      home: "головна",
      login: "увійти",
      register: "реєстрація",
      submit: "підтвердити",
      reset: "очистити"
    },
    home: {
      title: 'головна'
    },
    registration: {
      title: "реєстрація",
      first_name: "Ім'я",
      last_name: 'Прізвище',
      email: 'Email',
      password: 'Пароль',
      repeat_password: 'Повторіть пароль',
      password_hint: `Пароль повинен містити великі та малі літери, а також цифри.
                      Він не може бути коротшим за 8 символів`,
      omniauth_text: 'через соціальні мережі'
    },
    confirmation: {
      title: "реєстрацію підтверджено",
      message: "Ви успішно підтвердили свою реєстрацію та можете увійти до свого акаунту."
    }
  }
}

export default messages
