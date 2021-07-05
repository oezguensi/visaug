import re
from ast import literal_eval
from io import BytesIO
from flask import Flask, send_file, request
from flask_cors import CORS
from torchvision import transforms
from PIL import Image
import inspect

app = Flask(__name__)
CORS(app)


def get_function_signature(func):
    argspec = inspect.getfullargspec(func)
    args, defaults = [arg for arg in argspec.args if arg != 'self'], argspec.defaults
    
    args_signature = ", ".join(
        [arg if defaults is None or (i < len(args) - len(defaults)) else f"{arg}={defaults[i - len(args)]}" for i, arg in enumerate(args)])
    
    return f'{func.__module__}.{func.__name__}({args_signature})'


def prepare_function_doc(func):
    doc = re.sub('\s+', ' ', func.__doc__[:func.__doc__.index('Args:')])[:-1]
    args_doc = func.__doc__[func.__doc__.index('Args:') + len('Args:'):]
    
    return doc, args_doc


@app.route('/', methods=['GET'])
def send_functions():
    names = ['RandomVerticalFlip', 'RandomHorizontalFlip', 'ColorJitter', 'CenterCrop']
    # names = ['ColorJitter', 'CenterCrop']
    
    funcs = []
    for func in [getattr(transforms, name) for name in names]:
        doc, args_doc = prepare_function_doc(func)
        
        argspec = inspect.getfullargspec(func)
        args = [arg for arg in argspec.args if arg != 'self']
        defaults = [None] * (len(args) - (0 if argspec.defaults is None else len(argspec.defaults))) + (
            [] if argspec.defaults is None else list(argspec.defaults))
        
        funcs.append({'name': func.__name__, 'signature': get_function_signature(func), 'doc': doc, 'argsDoc': args_doc,
                      'args': [{'name': arg, 'value': default} for arg, default in zip(args, defaults)]})
    
    return {'functions': funcs}


@app.route('/augment', methods=['GET'])
def send_augmented_image():
    img = Image.open('../app/src/assets/test_img.png').convert('RGB')
    
    print('request', request.args.to_dict())
    for aug, args in literal_eval(request.args.to_dict()['augmentations']).items():
        try:
            # img = getattr(transforms, aug)(**args)(img) TODO switch back after app can handle correct input format
            img = getattr(transforms, aug)(**{key: int(val) for key, val in args.items()})(img)
        except:
            pass  # TODO send traceback and image
    
    # Transform image to be able to send
    img_io = BytesIO()
    img.convert('RGB').save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    
    return send_file(img_io, mimetype='image/jpeg')


@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save('../app/src/assets/test_img.png')
        
        return 'file uploaded successfully'
    return


if __name__ == '__main__':
    app.run(debug=True)
