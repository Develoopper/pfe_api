import os
import sys

if len(sys.argv) <= 2:
    m = open("api/models/" + sys.argv[1] + ".model.js", "w")
    r = open("api/routers/" + sys.argv[1] + ".router.js", "w")
    c = open("api/controllers/" + sys.argv[1] + "s.controller.js", "w")

    model = open("mrc/model.txt", "r")
    router = open("mrc/router.txt", "r")
    controller = open("mrc/controller.txt", "r")

    T = [[model, m], [router, r], [controller, c]]

    for mrc in T:
        for line in mrc[0]:
            x = line
            if '%mrc%' in x:
                x = x.replace('%mrc%', sys.argv[1])
            if '%MRC%' in x:
                x = x.replace('%MRC%', sys.argv[1].capitalize())
            
            mrc[1].write(x)

    m.close()
    r.close()
    c.close()
    model.close()
    router.close()
    controller.close()

elif sys.argv[2] == "-d":
    os.remove("./api/models/" + sys.argv[1] + ".model.js")
    os.remove("./api/routers/" + sys.argv[1] + ".router.js")
    os.remove("./api/controllers/" + sys.argv[1] + "s.controller.js")

#from cx_Freeze import setup, Executable

# setup(name = "mrc" ,
#       version = "1.0" ,
#       description = "" ,
#       executables = [Executable("mrc.py")])