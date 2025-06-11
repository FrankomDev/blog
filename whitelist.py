import env as env
import pydig

whitelist = env.whitelist

def dig(domain):
    value = pydig.query(domain, 'A')
    if len(value) >= 2:
        return value[1]
    else:
        return value[0]

def whitelistF():
    wl = []
    for line in whitelist:
        for char in line:
            if char.isdigit():
                wl.append(line)
                break
            else:
                wl.append(dig(line))
                break
    wl.append('end')
    return wl

#print(whitelistF())