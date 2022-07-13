import pyautogui
import time
 
def main():
    print("waiting 3 seconds")
    time.sleep(3)
    while True:
        pyautogui.click() 

main()