const sharp = require('sharp');
const fs = require('fs');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (
        file.mimetype.startsWith('image') ||
        file.mimetype.startsWith('excel') ||
        file.mimetype.startsWith(
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) ||
        file.mimetype.startsWith('video/mp4') ||
        file.mimetype.startsWith('application/pdf')
    ) {
        console.log('nul')
        cb(null, true);
    } else {
        cb(
            new AppError(
                'Pas une image, veuillez télécharger uniquement des images',
                400
            ),
            false
        );
    }
};

const upload = multer({storage: multerStorage, fileFilter: multerFilter});
exports.uploadModelPhotoSingle = upload.single('photo');

exports.uploadModelPhotoMultiple = upload.array('files');
/* Ajouter fichiers banniere */
exports.uploadModelBanniere = upload.fields([
    {name: 'slider1', maxCount: 3},
    {name: 'slider2', maxCount: 3},
    {name: 'slider3', maxCount: 3},
    {name: 'banniere1', maxCount: 2},
    {name: 'banniere2', maxCount: 1}
]);

exports.resizeModelPhoto = Model =>
    catchAsync(async (req, res, next) => {
        console.log('file',!req.file)
        if (!req.file) {
            return next();
        }
        const name = `${req.file.originalname}`;
        await sharp(req.file.buffer)
            // .resize(480, 640)
            .toFormat('png')
            .png({quality: 100})
            .toFile(`public/img/${Model}/${name}`);

        next();
    });

exports.createpdf = Model =>
    catchAsync(async (req, res, next) => {
        // console.log("er", req.files.pdf.name.split('.')[0]);
        if (!req.files) {
            return res.status(400).send('Aucun fichier n\'a été téléchargé.');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const sampleFile = req.files.pdf;
        const name = `${Model}-${req.files.pdf.name.split('.')[0]}.pdf`;
        // console.log("sampleFile", sampleFile);
        // Use the mv() method to place the file somewhere on your server
        await sampleFile.mv(`public/img/${Model}/${name}`);
        // res.send("File uploaded!");
        // });
        res.status(201).json({
            status: 'Validé',
            name
            // PointVente: newPointVente,
        });
    });

exports.resizeModelImages = Model =>
    catchAsync(async (req, res, next) => {
        if (req.files[0].mimetype.startsWith('application/pdf')) {
            req.files[0].filename = `${Model}-${Date.now()}${req.user.name}.pdf`;
            req.body.photo = req.files[0].filename;
            req.body.image_name = req.files[0].filename;
            await fs.writeFile(
                `public/img/${Model}/${req.files[0].filename}`,
                req.files[0].buffer,
                function (err) {
                    if (err) return console.log(err);
                    console.log('success');
                }
            );
        }
        if (req.file.mimetype.startsWith('image')) {
            req.file.filename = `${Model}-${Date.now()}${req.user.name}.png`;
            req.file.photo = req.file.filename;
            req.file.image_name = req.file.filename;
            await sharp(req.file.buffer)
                // .resize(480, 640)
                .toFormat('png')
                .png({quality: 100})
                .toFile(`public/img/${Model}/${req.file.filename}`);
        }
    });
exports.resizeBanniereImages = Model =>
    catchAsync(async (req, res, next) => {
        console.log("oki", req.files);
        if (!req.files) {
            return next(new AppError("Veuillez ajouter une photo d'abord", 410));
        }
        for (let id = 1; id < 4; id++) {
            // let slider=''
            if (req.files[`slider${id}`]) {
                // 1)photo image
                await Promise.all(
                    req.files[`slider${id}`].map(async (file, i) => {
                        req.body[`slider${id}`] = `banniere-slider-${id}-${Date.now()}-${i +
                        [i]}.jpeg`;
                        // console.log("req", req.body["slider" + id]);
                        //  const filename = `banniere-slider[i]${Date.now()}-${i + [i]}.jpeg`;
                        await sharp(file.buffer)
                            // .resize(1500, 600)
                            .toFormat('jpeg')
                            .jpeg({quality: 100})
                            .toFile(`public/img/${Model}/${req.body[`slider${id}`]}`);
                        // console.log("oki", filename[i]);
                    })
                );
            }
        }
        // if (req.files.slider2) {
        //   await Promise.all(
        //     req.files.slider2.map(async (file, i) => {
        //       req.body.slider2 = `banniere-slider2${Date.now()}-${i + 1}.jpeg`;
        //       //  const filename = `banniere-slider2${Date.now()}-${i + 1}.jpeg`;
        //       await sharp(file.buffer)
        //         .resize(1500, 600)
        //         .toFormat("jpeg")
        //         .jpeg({ quality: 100 })
        //         .toFile(`public/img/${Model}/${req.body.slider2}`);
        //       // console.log("oki", filename[i]);
        //     })
        //   );
        // }
        // if (req.files.slider3) {
        //   await Promise.all(
        //     req.files.slider3.map(async (file, i) => {
        //       req.body.slider3 = `banniere-slider3${Date.now()}-${i + 1}.jpeg`;
        //       //  const filename = `banniere-slider3${Date.now()}-${i + 1}.jpeg`;
        //       await sharp(file.buffer)
        //         // .resize(1500, 600)
        //         .toFormat("jpeg")
        //         .jpeg({ quality: 100 })
        //         .toFile(`public/img/${Model}/${req.body.slider3}`);
        //       // console.log("oki", filename[i]);
        //     })
        //   );
        // }
        for (let id = 1; id < 4; id++) {
            if (req.files[`banniere${id}`]) {
                // eslint-disable-next-line no-await-in-loop
                await Promise.all(
                    req.files[`banniere${id}`].map(async (file, i) => {
                        req.body[`banniere${id}`] = `banniere${id}-${Date.now()}-${i +
                        id}.jpeg`;
                        //  const filename = `banniere1-${Date.now()}-${i + 1}.jpeg`;
                        await sharp(file.buffer)
                            // .resize(1500, 600)
                            .toFormat('jpeg')
                            .jpeg({quality: 100})
                            .toFile(`public/img/${Model}/${req.body[`banniere${id}`]}`);
                        // console.log("oki", filename[i]);
                    })
                );
            }
        }
        // if (req.files.banniere2) {
        //   await Promise.all(
        //     req.files.banniere2.map(async (file, i) => {
        //       req.body.banniere2 = `banniere2-${Date.now()}-${i + 1}.jpeg`;
        //       //  const filename = `banniere2-${Date.now()}-${i + 1}.jpeg`;
        //       await sharp(file.buffer)
        //         // .resize(1500, 600)
        //         .toFormat("jpeg")
        //         .jpeg({ quality: 100 })
        //         .toFile(`public/img/${Model}/${req.body.banniere2}`);
        //       // console.log("oki", filename[i]);
        //     })
        //   );
        // }
        next();
    });
exports.resizeBanniereImage = Model =>
    catchAsync(async (req, res, next) => {
        console.log('file', req.file);
        console.log('body', req.body);
        // console.log('file',req);
        if (!req.file) return next();
        req.file.filename = `${req.body.position}-${Date.now()}.png`;
        req.body.photo = req.file.filename;
        await sharp(req.file.buffer)
            // .resize(480, 640)
            .toFormat('png')
            .png({quality: 100})
            .toFile(`public/img/${Model}/${req.file.filename}`);

        next();
    });
