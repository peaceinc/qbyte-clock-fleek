import hashlib

near_user = 'peace_inc.near'

near_enc = near_user.encode('utf-8')
hashed_user = hashlib.sha256(near_enc).hexdigest()
# take 2 at a time, if >250 or in previous, reject and move on.
ult_set=[]


for a in range (0,64,2):
    xx = int(hashed_user[a:a+2],16)
    if (xx not in ult_set) and (xx<250) and (len(ult_set)<90):
        ult_set.append(xx)

while len(ult_set)<90:
    near_user = '%s'%ult_set
    near_enc = near_user.encode('utf-8')
    hashed_user = hashlib.sha256(near_enc).hexdigest()
    for a in range (0,64,2):
        xx = int(hashed_user[a:a+2],16)
        if (xx not in ult_set) and (xx<250) and (len(ult_set)<90):
            ult_set.append(xx)

ult_sorted_set = sorted(ult_set)
print(ult_sorted_set)
