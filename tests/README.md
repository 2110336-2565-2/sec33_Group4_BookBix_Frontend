# Robot Framework installation

# Windows

1. Go to https://www.python.org/downloads/windows/ download and install Python
2. Click "Add python.exe to PATH"
   ![01](https://user-images.githubusercontent.com/102522906/227930953-79fd8668-5998-4fbd-8816-e507c3459bf1.jpg)
3. Go to Tis PC > Properties > Advanced system settings > Environment Variables
4. Click PATH on User variables
   ![06](https://user-images.githubusercontent.com/102522906/227931812-4fc34751-0d33-4fe2-bf61-49a049cf3847.jpg)
5. Copy 2 variable Python\Pythonxx\Scripts and Python\Pythonxx
6. Go to system variables and click PATH
7. Add 2 variable that copied
   ![02](https://user-images.githubusercontent.com/102522906/227932334-69a247a8-e519-48c1-b669-3df2270e3555.jpg)
8. Recheck Python install success with command python –-version or python -v

```
python --version
```

![03](https://user-images.githubusercontent.com/102522906/227933213-3938e9d8-0603-4739-97c7-520696289b4d.jpg)

9. Open a command and run the below command

```
pip3 install robotframework
```

recheck install success with

```
robot --version
```

10. Install seleniumlibrary

```
pip3 install robotframework-seleniumlibrary
```

![05](https://user-images.githubusercontent.com/102522906/227933787-50e9b20d-1635-4bce-ae0a-0348f0e7e9bd.jpg)

11. Download ChromeDriver from https://chromedriver.chromium.org/downloads

12. Copy file (chromedriver) to Python path that installed (e.g. Programs\Python\Python310\Scripts)

# Mac

1. Go to https://www.python.org/downloads/macos/ download and install Python [Windows][mac]
2. Recheck Python install success with command python –version or python -v [Windows][mac]
3. Install pip

```
sudo easy_install pip3
```

4. Open a command and run the below command

```
pip3 install robotframework
```

recheck install success with

```
robot --version
```

5. Upgrade the pip with the below command

```
python -m pip3 install -U pip3
```

6. Install seleniumlibrary

```
pip3 install robotframework-seleniumlibrary
```

7. Go to https://chromedriver.chromium.org/downloads for adding Chrome Driver
8. Go to Terminal and input a command

```
where python
```

- or click folder Go>Go to folder>/usr/local/bin

9. Go to Python folder and copy chromedriver file into the folder
   <img width="615" alt="Screen Shot 2566-03-21 at 23 26 34" src="https://user-images.githubusercontent.com/102522906/226675737-ccf77b0e-ea4b-423d-be83-fdf558c61c92.png">

# Install VSCode [Windows][mac]

1. Download and install VS code https://code.visualstudio.com/ [Windows][mac]
2. Go to View>Extensions and add "Robot Framework Language Server"

![Screen Shot 2566-03-21 at 23 17 33](https://user-images.githubusercontent.com/102522906/226673853-afa42908-ab8d-4a9b-9710-f2c3e210b2f9.png)
