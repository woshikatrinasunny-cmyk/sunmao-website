from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/routes')
def routes():
    return render_template('routes.html')

@app.route('/culture')
def culture():
    return render_template('culture.html')

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/viewer3d')
def viewer3d():
    return render_template('viewer3d.html')

@app.route('/experience/<exp_type>')
def experience(exp_type):
    return render_template('experience.html', exp_type=exp_type)

@app.route('/route_detail/<route_name>')
def route_detail(route_name):
    return render_template('route_detail.html', route_name=route_name)

# 微信验证文件路由
@app.route('/7629f2f2f84ace5a3c1cc31e74775e29.txt')
def wechat_verify():
    return '31938865e7701e234893284b2859d1dc23e9aeb', 200, {'Content-Type': 'text/plain'}

if __name__ == '__main__':
    # 开发环境：使用localhost（WebXR支持）
    # 生产环境：Render会自动设置PORT环境变量
    
    import os
    port = int(os.environ.get('PORT', 5001))
    
    # 生产环境使用0.0.0.0以便外部访问
    app.run(debug=False, host='0.0.0.0', port=port)
