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

    BOOL CALLBACK handle_enum(__in HWND a) {
        char buff[255];

        GetWindowTextA(a, (LPSTR)buff, 254);
        
        if (strstr(buff, "MuseDash")) {
            printf("pog");
            printf("%lu \n", GetWindowLongW(ghwnd, GWL_STYLE));
            SetWindowLongPtr(ghwnd, GWL_STYLE, (LONG_PTR)WS_CHILD | GetWindowLongPtr(ghwnd, GWL_STYLE));
            printf("%lu", GetWindowLongW(ghwnd, GWL_STYLE));
            SetParent(ghwnd, a);
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