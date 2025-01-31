Exercises

Exercise DS.2.0
Download and install GnuPG from https://www.gnupg.org/download/, find the appropriate version in the section: GnuPG binary releases.

Generate a keypair for yourself, and export your public key to an asc, ASCII Armored, file. Use your regular email address when generating your keypair.

Then publish your exported public key to either:

https://keys.openpgp.org
https://keyserver.pgp.com, or
https://pgp.mit.edu/
If you get a verification email, don’t ignore it.

Exercise DS.2.1
Create a text file, and encrypt it with your own public key, use your email as recipient. Give the encrypted file the name SecE1.enc.txt. Then open the encrypted file in your favorite editor. What happens?

Then decrypt the file into a file differently name than the original file. Verify that the content has become itself again.

Finally, encrypt the original file with arosano@protonmail.com as the recipient. You may get the public key from: https://keys.openpgp.org Name the output SecE1a.enc.txt.

Both encrypted files go into the repo.

Exercise DS.2.2
Take the text of this assignment, and put it into a txt document. Then sign it with a regular digital signature, name the output SecE2.sign.txt, and put it into the repo.

Exercise DS.2.3
Create a short document, and clearsign it into SecE3.sig.txt. The document should give a possible use case for clearsign.

Exercise DS.2.4
Create a short document, and detached sign it into SecE4.det.sig.txt. The document should give a possible use case for detached signatures.
