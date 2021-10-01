<h1 align="center">Pigeon</h1>
<p align="center">
<img src="./frontend/src/assets/logo.png">
</p>



A WhatsApp-inspired real-time browser-based chat application made by using Django & Django channels in the backend and React, React-Redux and React router in the frontend.

<details><summary>Project structure</summary>
<p>

```
PIGEON
│   .gitignore
│   manage.py
│   README.md
│   requirements.txt
│   
├───backend
│   │   __init__.py
│   │   
│   ├───chat
│   │       admin.py
│   │       apps.py
│   │       consumers.py
│   │       models.py
│   │       permissions.py
│   │       routing.py
│   │       serializers.py
│   │       signals.py
│   │       urls.py
│   │       utils.py
│   │       views.py
│   │       __init__.py
│   │       
│   └───users
│       │   admin.py
│       │   apps.py
│       │   authentication.py
│       │   managers.py
│       │   models.py
│       │   serializers.py
│       │   urls.py
│       │   views.py
│       │   __init__.py
│       │   
│       └───profile_images
│               default_image.png
│               
├───frontend
│   │   apps.py
│   │   babel.config.json
│   │   package-lock.json
│   │   package.json
│   │   urls.py
│   │   views.py
│   │   webpack.config.js
│   │   __init__.py
│   │   
│   ├───src
│   │   │   App.css
│   │   │   App.js
│   │   │   fetch_.js
│   │   │   index.css
│   │   │   index.js
│   │   │   
│   │   ├───assets
│   │   │       bg.png
│   │   │       bg1.jpg
│   │   │       bg2.jpg
│   │   │       bg3.jpg
│   │   │       group_image.png
│   │   │       logo.png
│   │   │       user_image.png
│   │   │       
│   │   ├───components
│   │   │   ├───auth
│   │   │   │   │   Activate.js
│   │   │   │   │   ActivationNotice.js
│   │   │   │   │   Login.js
│   │   │   │   │   PrivateRoute.js
│   │   │   │   │   Register.js
│   │   │   │   │   
│   │   │   │   └───css
│   │   │   │           ActivationNotice.css
│   │   │   │           Common.css
│   │   │   │           
│   │   │   └───ChatApp
│   │   │       │   ChatApp.js
│   │   │       │   
│   │   │       ├───chat
│   │   │       │   │   Chat.js
│   │   │       │   │   ChatBody.js
│   │   │       │   │   ChatFooter.js
│   │   │       │   │   ChatHeader.js
│   │   │       │   │   ChatMessage.js
│   │   │       │   │   
│   │   │       │   └───css
│   │   │       │           Chat.css
│   │   │       │           ChatBody.css
│   │   │       │           ChatFooter.css
│   │   │       │           ChatHeader.css
│   │   │       │           ChatMessage.css
│   │   │       │           
│   │   │       ├───others
│   │   │       │   │   DropdownMenu.js
│   │   │       │   │   Modal.css
│   │   │       │   │   Modal.js
│   │   │       │   │   Toast.js
│   │   │       │   │   
│   │   │       │   └───assets
│   │   │       │           check.svg
│   │   │       │           error.svg
│   │   │       │           Toast.css
│   │   │       │           
│   │   │       └───sidebar
│   │   │           │   GroupCard.js
│   │   │           │   NewGroup.js
│   │   │           │   Sidebar.js
│   │   │           │   UserCard.js
│   │   │           │   
│   │   │           └───css
│   │   │                   GroupCard.css
│   │   │                   NewGroup.css
│   │   │                   Sidebar.css
│   │   │                   UserCard.css
│   │   │                   
│   │   └───redux
│   │       │   index.js
│   │       │   README.md
│   │       │   rootReducer.js
│   │       │   store.js
│   │       │   
│   │       ├───activate
│   │       │       actions.js
│   │       │       actionTypes.js
│   │       │       reducer.js
│   │       │       state.js
│   │       │       
│   │       ├───app
│   │       │       reducer.js
│   │       │       state.js
│   │       │       
│   │       ├───csrf
│   │       │       actions.js
│   │       │       actionTypes.js
│   │       │       reducer.js
│   │       │       state.js
│   │       │       
│   │       ├───groups
│   │       │       actions.js
│   │       │       actionTypes.js
│   │       │       reducer.js
│   │       │       state.js
│   │       │       
│   │       ├───login
│   │       │       actions.js
│   │       │       actionTypes.js
│   │       │       reducer.js
│   │       │       state.js
│   │       │       
│   │       ├───modal
│   │       │       actions.js
│   │       │       actionTypes.js
│   │       │       reducer.js
│   │       │       state.js
│   │       │       
│   │       ├───register
│   │       │       actions.js
│   │       │       actionTypes.js
│   │       │       reducer.js
│   │       │       state.js
│   │       │       
│   │       └───toast
│   │               actions.js
│   │               actionTypes.js
│   │               reducer.js
│   │               state.js
│   │               
│   └───templates
│       └───frontend
│               index.html
│               
└───pigeon
    │   asgi.py
    │   settings.py
    │   urls.py
    │   wsgi.py
    │   __init__.py
    │   
    └───middleware
            middleware.py
            __init.py__
```

</p>
</details>