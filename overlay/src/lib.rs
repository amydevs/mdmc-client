extern crate winapi;
use winapi::shared::minwindef::LPARAM;
use winapi::shared::windef::*;
use winapi::um::winuser::*;
use std::ffi::*;

#[no_mangle]

pub extern fn fibonacci(hwnd: &HWND) -> i32 {
    let mut rect = RECT {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    };
    unsafe {
        let mut thing:Vec<HWND> = vec![];
        EnumWindows(Some(handle_enum), 0 as isize);
        // SetParent(*hwnd, );
        GetWindowRect(*hwnd, &mut rect);
        return rect.right - rect.left;
    }
}

unsafe extern "system" fn handle_enum(a: *mut HWND__, b: isize) -> i32 {
    let mut rect = RECT {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    };
    GetWindowRect(HWND::from(a), &mut rect);
    println!("{}", rect.right - rect.left);

    return 1;
}

fn str_to_u8(s: &str) -> *const i8 {
    let c_str = CString::new(s).unwrap();
    c_str.as_ptr() as *const i8
}