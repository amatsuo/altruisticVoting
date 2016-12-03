module.exports = function(settings, headers) {

    var value=settings.standard.CANTIDAD,unidad=settings.standard.UNIDAD_ESTANDAR;
    return {
        title: "Number Addition Results",
        Module: "Results",
        proceed:"Next",
        error:"Please answer all questions before proceeding.",
        errorClose: "Close",

    };
};
/**
 * Created by Aki on 2016-12-3
 */
