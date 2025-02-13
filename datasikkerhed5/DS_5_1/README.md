```
//6 characters, 5 lowercase letters and one digit
$ echo -n "apple1" | shasum -a 256 | tr -d " -" > bftest6
$ echo -n "beach2" | shasum -a 256 | tr -d " -" >> bftest6
$ echo -n "cream3" | shasum -a 256 | tr -d " -" >> bftest6
$ echo -n "green4" | shasum -a 256 | tr -d " -" >> bftest6
$ echo -n "table5" | shasum -a 256 | tr -d " -" >> bftest6

$ time hashcat -m 1400 -a 3 bftest6 ?l?l?l?l?l?d > /dev/null

real 0m0.286s
user 0m0.027s
sys 0m0.083s

$ hashcat --show -m 1400 bftest6
6f677963023a2ed99caf05f73ef9797d34022bca02970a2bd98c00366c4b1aa4:apple1
449584c06fbc697a863205dff6bc687105d93658ea378a912921a8cfbc82c69c:beach2
8880248627528a16be7cb3ee83528361aab5a5c6e5c378046073bbfe378e8e3b:cream3
d00694490d6df20e46ef39cf548cb44eeb05e7e98032e1b0e8d43f99b4699143:green4
307b80fb1a9482ed921d438b95f0792ef64f0abbd3190e0b5617ddcf722b14ef:table5


//5 characters, 4 lowercase letters and 1 digit
$ echo -n "rain1" | shasum -a 256 | tr -d " -" > bftest5
$ echo -n "wind2" | shasum -a 256 | tr -d " -" >> bftest5
$ echo -n "wave3" | shasum -a 256 | tr -d " -" >> bftest5
$ echo -n "tide4" | shasum -a 256 | tr -d " -" >> bftest5
$ echo -n "moon5" | shasum -a 256 | tr -d " -" >> bftest5

$ time hashcat -m 1400 -a 3 bftest5 ?l?l?l?l?d > /dev/null

real	0m1.983s
user	0m0.337s
sys	0m0.351s

$ hashcat --show -m 1400 bftest5
220e0824218a9dd5eaa76af60673000b2077dfa25cb7a2d9333b35b460bf409a:rain1
74e334b1bf621b0275ac491593cf417f346b9585918c8270e057c1be4f814ef4:wind2
b959112e9fef0ff7b35866cae57b9db26b516a96a2d0a8516d5594e67be33faa:wave3
58d7204f1e49fe2131fdb4cbb4012b68732df021c0ad841f94a4848135b76df5:tide4
8499457b46e08ca8ca1f76b65bbd9fb22c05ea1ec4e18c213d4a2c679722d091:moon5


//4 characters, 3 lowercase letters and 1 digit
echo -n "axe1" | shasum -a 256 | tr -d " -" > bftest4
echo -n "ant2" | shasum -a 256 | tr -d " -" >> bftest4
echo -n "fox3" | shasum -a 256 | tr -d " -" >> bftest4
echo -n "neo4" | shasum -a 256 | tr -d " -" >> bftest4
echo -n "zap5" | shasum -a 256 | tr -d " -" >> bftest4

$ time hashcat -m 1400 -a 3 bftest4 ?l?l?l?d > /dev/null

real	0m1.770s
user	0m0.321s
sys	0m0.306s

$ hashcat --show -m 1400 bftest4
4cd3e4383b90aff8d9bf1135e499334b6cb5d81ddf092baa05df472b8dd56582:axe1
d821aecf932bb4651f8a9b9bdbd270455060901c4d5b436a887e02e87f3d89b9:ant2
0800eb95013aa73db72099f4b077a43d6226229c0ae24924380cfabdfd3a3540:fox3
f66e2a59eaec95f60dfb362af8dd4494a9f529f3eee43528efc0d417a88c3517:neo4
8709730aebf5a182c68d1da5233cbf424e502613e4f21446746290d74de36af3:zap5
```
