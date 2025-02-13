```
rasmus$ echo -n "Fede" | shasum -a 256 | tr -d " -" > bftest.txt
rasmus$ echo -n "test" | shasum -a 256 | tr -d " -" >> bftest.txt
rasmus$ echo -n "1234" | shasum -a 256 | tr -d " -" >> bftest.txt
rasmus$ echo -n "fede" | shasum -a 256 | tr -d " -" >> bftest.txt

rasmus$ cat bftest.txt
d889b34ddb94fb9623a5078514acec441b0004b0705561b8646aee828b6d8add
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
5d942a1d73fd8f28d71e6b03d2e42f44721db94b734c2edcfe6fcd48b76a74f9

rasmus$ hashcat -m 1400 -a 3 bftest.txt ?l?d?u
hashcat (v6.2.6) starting

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

INFO: All hashes found as potfile and/or empty entries! Use --show to display them.

Started: Thu Feb 13 15:03:17 2025
Stopped: Thu Feb 13 15:03:17 2025

rasmus$ hashcat --show -m 1400 bftest.txt

d889b34ddb94fb9623a5078514acec441b0004b0705561b8646aee828b6d8add:Fede
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08:test
03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4:1234
5d942a1d73fd8f28d71e6b03d2e42f44721db94b734c2edcfe6fcd48b76a74f9:fede
```
