const UserRouter = require('./userRouter');
const HomeRouter = require('./homeRouter');
const AccountRouter = require('./accountRouter');
                        const CardRouter = require('./cardRouter');
                    const IdeaRouter = require('./ideaRouter');
                    const GroupRouter = require('./groupRouter');
                    const UserProfileRouter = require('./userProfileRouter');
                    const ChoiceRouter = require('./choiceRouter');
                                const IdeaAnswerRouter = require('./ideaAnswerRouter');
                    const ReportingRouter = require('./reportingRouter');
                    const PhotoRouter = require('./photoRouter');
            
module.exports = function (app, passport){
    new UserRouter('/user', app, passport);
    new HomeRouter('/home', app, passport);
    new AccountRouter('/account', app, passport);
                                                new CardRouter('/card', app, passport);
                                    new IdeaRouter('/idea', app, passport);
                                    new GroupRouter('/group', app, passport);
                                    new UserProfileRouter('/userprofile', app, passport);
                                    new ChoiceRouter('/choice', app, passport);
                                                        new IdeaAnswerRouter('/ideaanswer', app, passport);
                                    new ReportingRouter('/reporting', app, passport);
                                    new PhotoRouter('/photo', app, passport);
                        
    app.get('/', function (req, res) {
         if (req.isAuthenticated()) {
            res.render('./home/index');
        } else {
            res.render('./index', { layout: 'unAutherizedLayout.hbs' });
        }
    });
};
