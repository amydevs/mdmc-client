extern crate winapi;
use winapi::shared::windef::*;
use winapi::um::winuser::*;
use std::ffi::*;
use  winapi::shared::basetsd::*;

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
        EnumWindows(Some(handle_enum), *hwnd as isize);
        // SetParent(*hwnd, );
        GetWindowRect(*hwnd, &mut rect);
        return rect.right - rect.left;
    }
}

unsafe extern "system" fn handle_enum(a: *mut HWND__, b: isize) -> i32 {
    
    // let mut rect = RECT {
    //     left: 0,
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    // };
    // GetWindowRect(HWND::from(a), &mut rect);
    // println!("{}", rect.right - rect.left);

    // let mut rect1 = RECT {
    //     left: 0,
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    // };
    // GetWindowRect(b as HWND, &mut rect1);
    // println!("{}", rect1.right - rect1.left);

    // SetParent(b as HWND, HWND::from(a));
    let mut v: Vec<u16> = Vec::with_capacity(255);
    let read_len = GetWindowTextW(
        HWND::from(a),
        v.as_mut_ptr(),
        255,
    );
    v.set_len(read_len as usize);
    println!("{}", format!("{}", String::from_utf16_lossy(&v)));
    if format!("{}", String::from_utf16_lossy(&v)) == "MuseDash".to_string() {
        
        println!("{:?}", SetWindowLongPtrA(b as HWND, GWL_STYLE, GetWindowLongPtrW(b as HWND, GWL_STYLE) | WS_CHILD as isize));
        println!("{:?}", SetParent(b as HWND, HWND::from(a)));
    }

    return 1;
}

fn str_to_mutu8(s: &str) -> *mut i8 {
    let c_str = CString::new(s).unwrap();
    c_str.as_ptr() as *mut i8
}

fn str_to_constu8(s: &str) -> *const i8 {
    let c_str = CString::new(s).unwrap();
    c_str.as_ptr() as *const i8
}