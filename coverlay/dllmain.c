// dllmain.cpp : Defines the entry point for the DLL application.
#include "pch.h"
#include <stdio.h>

BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
                     )
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

#ifdef __cplusplus
extern "C" {
#endif


    HWND* ghwnd;
    FILE* fDummy;

    //The function that implements the key logging functionality
    LRESULT CALLBACK LowLevelKeyboardProc(int nCode, WPARAM wParam, LPARAM lParam)
    {
        
        // Declare a pointer to the KBDLLHOOKSTRUCTdsad
        KBDLLHOOKSTRUCT* pKeyBoard = (KBDLLHOOKSTRUCT*)lParam;
        int pressedKey = pKeyBoard->vkCode;
        switch (wParam)
        {
            case WM_KEYDOWN: 
            {
                SendMessage(ghwnd, WM_KEYDOWN, pressedKey, 0x002C0001);
            }
            case WM_CHAR: {
                SendMessage(ghwnd, WM_CHAR, pressedKey, 0x002C0001);
            }
            case WM_KEYUP: // When the key has been pressed and released
            {
                //get the key code
                SendMessage(ghwnd, WM_KEYUP, (int)((KBDLLHOOKSTRUCT*)lParam)->vkCode, 0x002C0001);
                printf("%c\n", ((KBDLLHOOKSTRUCT*)lParam)->vkCode);
            }
            break;
            default:
                return CallNextHookEx(NULL, nCode, wParam, lParam);
                break;
        }

        //according to winapi all functions which implement a hook must return by calling next hook
        return CallNextHookEx(NULL, nCode, wParam, lParam);
    }

    BOOL CALLBACK handle_enum(__in HWND a) {
        char buff[255];

        GetWindowTextA(a, (LPSTR)buff, 254);
        if (strstr(buff, "Command Prompt")) {
        /*if (strstr(buff, "MuseDash")) {*/
            printf("pog");
            printf("%lu \n", GetWindowLongW(ghwnd, GWL_STYLE));
            SetWindowLongPtr(ghwnd, GWL_STYLE, (LONG_PTR)WS_CHILD | GetWindowLongPtr(ghwnd, GWL_STYLE));
            printf("%lu", GetWindowLongW(ghwnd, GWL_STYLE));
            SetParent(ghwnd, a);

            HINSTANCE instance = GetModuleHandle(NULL);

            SetWindowsHookEx(WH_KEYBOARD_LL, LowLevelKeyboardProc, instance, 0);
        }

        return TRUE;
    }

    EXPORT debug() {
        AllocConsole();
        freopen_s(&fDummy, "CONIN$", "r", stdin);
        freopen_s(&fDummy, "CONOUT$", "w", stderr);
        freopen_s(&fDummy, "CONOUT$", "w", stdout);
        return 1;
    }

    EXPORT fibonacci(HWND *hwnd) {
        

        // debug
        /*AllocConsole();
        freopen_s(&fDummy, "CONIN$", "r", stdin);
        freopen_s(&fDummy, "CONOUT$", "w", stderr);
        freopen_s(&fDummy, "CONOUT$", "w", stdout);*/

        ghwnd = *hwnd;

        EnumWindows(handle_enum, NULL);

        RECT rect;
        GetWindowRect(*hwnd, &rect);
        printf("%d", rect.right - rect.left);
        return rect.right - rect.left;
    }

    

#ifdef __cplusplus
}
#endif