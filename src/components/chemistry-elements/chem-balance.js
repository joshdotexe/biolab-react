// load math.js
import * as math from 'mathjs'

export function buildMatrices(compoundMatrix, elements, isProducts) {
    var matrix = [];
    compoundMatrix.forEach(c => {
        var arr = [];
        elements.forEach(e => {
            var y = c.find(x => x.element === e);
            var val = (y === undefined) ? 0 : (isProducts) ? y.totalAtoms * -1 : y.totalAtoms;
            arr.push(val);
            //console.log(`${e}`,{val:val, arr:arr, cmpd:c} );
        });
        matrix.push(arr);
    });
    return matrix;
}

export function balanceEquation(reactants, products) {
    // console.log("eq", {p:this.productEq.current, r: this.reactantEq.current});
    var rectResults = this.parseEquation(reactants);
    var prodResults = this.parseEquation(products);

    var elements = rectResults.compoundMatrix.map(c => c.map(e => e.element))
        .concat(prodResults.compoundMatrix.map(p => p.map(e => e.element)))
        .flat()
        .filter((item, index, arr) => arr.indexOf(item) === index);

    var compounds = rectResults.compounds.map(c => c)
        .concat(prodResults.compounds.map(p => p))
        .filter((item, index, arr) => arr.indexOf(item) === index);

    var compoundsMatrix = this.buildMatrices(rectResults.compoundMatrix, elements, false)
        .concat(this.buildMatrices(prodResults.compoundMatrix, elements, true));

    var results = {
        reactants: rectResults,
        products: prodResults,
        elements: elements,
        compounds: compounds,
        compoundsMatrix: compoundsMatrix
    }; 
    console.log(results);

    var coeffsResults = this.balance(compoundsMatrix);
    if (coeffsResults === null) {

        return null;
    }
    var coeffs = coeffsResults.coeffs;
    var _reactants = [];
    var i = 0;
    for (i = 0; i < results.reactants.compounds.length; i++) {
        _reactants.push({ name: results.reactants.compounds[i], coeff: coeffs[i] });
    }
    var _products = [];
    for (i = 0; i < results.products.compounds.length; i++) {
        _products.push({ name: results.products.compounds[i], coeff: coeffs[i + _reactants.length] });
    }

    return {
        reactantCpds: _reactants,
        productCpds: _products
    };
}
export function parseEquation(eq) {
    var compounds = eq.split("+");
    var compoundMatrix = [];
    for (var i = 0; i < compounds.length; i++) {
        var matrix = this.parseCompound(compounds[i].trim());
        if (matrix.length === 0) {
            //TODO: show parse compound error
            continue;
        }
        compoundMatrix.push(matrix);
    }
    return {
        compounds: compounds,
        compoundMatrix: compoundMatrix
    }
}
export function parseCompound(compound) {
    const regex = /\((\d*)(Zr|Zn|Yb|Y|Xe|W|V|U|Ts|Tm|Tl|Ti|Th|Te|Tc|Tb|Ta|Sr|Sn|Sm|Si|Sg|Se|Sc|Sb|S|Ru|Rn|Rh|Rg|Rf|Re|Rb|Ra|Pu|Pt|Pr|Po|Pm|Pd|Pb|Pa|P|Os|Og|O|Np|No|Ni|Nh|Ne|Nd|Nb|Na|N|Mt|Mo|Mn|Mg|Md|Mc|Lv|Lu|Lr|Li|La|Kr|K|Ir|In|I|Hs|Ho|Hg|Hf|He|H|Ge|Gd|Ga|Fr|Fm|Fl|Fe|F|Eu|Es|Er|Dy|Ds|Db|Cu|Cs|Cr|Co|Cn|Cm|Cl|Cf|Ce|Cd|Ca|C|Br|Bk|Bi|Bh|Be|Ba|B|Au|At|As|Ar|Am|Al|Ag|Ac)(\d*)\)(\d*)|(\d*)(Zr|Zn|Yb|Y|Xe|W|V|U|Ts|Tm|Tl|Ti|Th|Te|Tc|Tb|Ta|Sr|Sn|Sm|Si|Sg|Se|Sc|Sb|S|Ru|Rn|Rh|Rg|Rf|Re|Rb|Ra|Pu|Pt|Pr|Po|Pm|Pd|Pb|Pa|P|Os|Og|O|Np|No|Ni|Nh|Ne|Nd|Nb|Na|N|Mt|Mo|Mn|Mg|Md|Mc|Lv|Lu|Lr|Li|La|Kr|K|Ir|In|I|Hs|Ho|Hg|Hf|He|H|Ge|Gd|Ga|Fr|Fm|Fl|Fe|F|Eu|Es|Er|Dy|Ds|Db|Cu|Cs|Cr|Co|Cn|Cm|Cl|Cf|Ce|Cd|Ca|C|Br|Bk|Bi|Bh|Be|Ba|B|Au|At|As|Ar|Am|Al|Ag|Ac)(\d*)/gm;
    var m;
    var compoundMatrix = [];
    while ((m = regex.exec(compound)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        if (!(m[2] || m[6])) {
            //TODO: show parse compound error
            continue;
        }
        var matrix = {
            preCof: Number(m[1] || m[5] || 1),
            element: m[2] || m[6],
            atoms: Number(m[3] || m[7] || 1),
            postCof: Number(m[4] || 1)
        };
        matrix.totalAtoms = matrix.preCof * matrix.atoms * matrix.postCof;
        compoundMatrix.push(matrix);
    }
    return compoundMatrix;
}

export function balance(compoundsMatrix) {
    var A = math.matrix(compoundsMatrix);
    var sizeOfA = math.size(A);
    var numOfCompounds = sizeOfA._data[0];
    var numOfElements = sizeOfA._data[1];
    var m = numOfElements;
    var n = numOfCompounds;
    var Z = math.zeros(m, n);
    var z = math.zeros(m);
    var e = math.ones(n);
    var I = math.identity(n);
    var _I = math.multiply(I, -1);
    /*
    ‘The matrix A and vector b of the system Ax=b are’ 
    A,b A=[A zeros(m,n);eye(n) -eye(n)]; b=[zeros(m,1);ones(n,1)]; 
    Foregoing line replaces original A and b by expanded A and b and 
    these new A and b become R and b of resulting in the non-homogeneous eqn. Ry=b
    */
    //b = [z(m,1) e(n,1)]
    var b = math.transpose(math.concat(z, e));
    //R = [A(m,n) Z(m,n) I(n) _I(n)]
    //Ry = b
    var R = math.zeros(m + n, 2 * n);

    R = math.subset(R,
        math.index(math.range(0, m), math.range(0, n)),
        math.transpose(A)
    );
    R = math.subset(R,
        math.index(math.range(m, m + n), math.range(0, n)),
        math.transpose(I)
    );

    R = math.subset(R,
        math.index(math.range(m, m + n), math.range(n, 2 * n)),
        math.transpose(_I)
    );

    console.log("cheminpsolver", { R: R, b: b, m: m, n: n, A: A, Z: Z, z: z, e: e, I: I, _I: _I });

    //m=m+n; n=2*n; 
    m = m + n;
    n *= 2;

    //P=eye(n); sd=0;
    var P = math.identity(n); var sd = 0;

    //x(1:n)=0;x=x';
    var x = math.transpose(math.zeros(n));

    //delb(1:m)=0; delb=delb'; bo=b;
    var delb = math.transpose(math.zeros(m)); var bo = b;
    var r = 0; var abar = 0;

    //for i=1:m, for j=1:n, 
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            //abar=abar+abs(A(i,j)); end; 
            abar += math.abs(R._data[i][j]);

        }
    }
    //abar=abar/(m*n);
    abar /= (m * n);

    // bbar=0; 
    var bbar = 0;
    //for i=1:m,  
    for (i = 0; i < m; i++) {
        //bbar=bbar+abs(b(i)); end;
        bbar += math.abs(b._data[i]);
    }
    //bbar=bbar/m; 
    bbar /= m;

    //for i=1:m 
    for (i = 0; i < m; i++) {
        // u=P*R(i,:)' ; 
        var Ri = math.subset(R, math.index(i, math.range(0, n)));
        //console.log("ri " +i, Ri);
        var rit = math.transpose(Ri);
        //console.log("rit " +i, rit);

        var u = math.multiply(P, rit);
        //console.log("u " +i, u);

        //v=norm(u)ˆ2; 
        var _u = math.norm(u, 'fro');
        //console.log("_u " +i, _u);
        var v = math.pow(_u, 2);
        // console.log("v", v);

        //s=b(i)-R(i,:)*x; 
        //var br = 
        // console.log("s=b(i)-R(i,:)*x; @ "+i, x);            
        var rx = math.multiply(Ri, x);
        //console.log("rx @ "+i, rx);

        var s = math.subtract(b._data[i], rx);
        //console.log("s @ "+i, s);
        /*
            c=0; 
            if v<=.00005*abar & abs(s)>=.00005*bbar 
            delb(i)=-s; sd=-s; b(i)=b(i)+delb(i); s=0; 
            elseif v<=.00005*abar & abs(s)<=.00005*bbar delb(i)=0; end 
        */
        var c = 0;
        if (v <= .00005 * abar && math.abs(s) >= .00005 * bbar) {
            delb[i] = -s;
            sd = -s;
            b[i] += delb[i];
            s = 0;
        }
        else if (v <= .00005 * abar && math.abs(s) <= .00005 * bbar) {
            delb[i] = 0;
        }
        /*
            if v>=.00005*abar, x=x+u*s/v; P=P-u*u'/v; c=1; delb(i)=0; end 
            r=r+c; end
        */
        if (v >= .00005 * abar) {
            var us = math.multiply(u, s);
            //  console.log("us", us);            

            var usv = math.divide(us, v);
            //  console.log("usv", usv);            

            x = math.add(x, usv);
            //  console.log("x", x);            

            var uu = math.multiply(u, math.transpose(u));
            var uuv = math.divide(uu, v);//******/
            P = math.subtract(P, uuv);
            //console.log("P", P);            

            c = 1;
            delb[i] = 0;
        }
        r += c;
        //     console.log("r", r);            
    }
    /*
        if abs(sd)>.00005*(abar+bbar)*0.5, ‘The system Ax=b is inconsistent.’, end; 
    */
    if (math.abs(sd) > .00005 * (abar + bbar) * 0.5) {
        console.log("The system Ax=b is inconsistent.");
        //TODO: show error
        return;
    }
    //   console.log("r & b & d", {R: R, b: b, delb:delb});

    //inci=norm(delb)/norm([R,b]); 
    var ab = math.subset(R, math.index(math.range(0, m), n), b._data);
    // console.log("ab", ab);
    var inci = math.divide(math.norm(delb, 'fro'), math.norm(ab, 'fro'));
    //   console.log("inci", inci);
    /*
   err=norm(bo-A*x)/norm(x); 
   */

    var Ax = math.multiply(R, x);
    var boAx = math.subtract(bo, Ax);
    var err = math.divide(math.norm(boAx, 'fro'), math.norm(x, 'fro'));
    console.log(`The projection operator P = (I – Aˆ+A) is’, ${P} ‘The rank of the matrix A is’, ${r} ‘The inconsistency index is’, ${inci} %‘Modification in vector b, i.e., Db is’, ${delb} %‘Vector b of the nearest consistent system is’, ${b} %‘Solution vector of the consistent/nearest consistent system is’, ${x} %‘Error in the solution vector x is’, ${err}`);

    /*
    *  if norm(P)<.00005, ‘The reaction is infeasible (coeffs. in reaction are all 0)’, return; end; 
    */
    if (math.norm(P, 'fro') < .00005) {
        console.log("‘The reaction is infeasible (coeffs. in reaction are all 0)’");
        //TODO:
        return null;
    }

    //n=n/2; xx=x(1:n); ‘Actual sol.’,xx, xx=xx/min(xx); xxx=xx, 
    n /= 2;
    var xx = math.subset(x, math.index(math.range(0, n)));
    xx = math.divide(xx, math.min(xx));
    console.log("Sol xx", xx);
    var xxx = math.ceil(xx);
    console.log("Sol rounded xxx", xxx);

    /*
    * for k=1:40 
    * xxx=k*xx,xxx=xxx-10ˆ-10*ones(n,1); 
    *rr=sum(ceil(xxx)-xxx)>.00005 & sum(xxx-floor(xxx))>.00005 & k<=40,
   if rr==0, ‘Value of rr=’, rr, ‘Value of k =’, k, ‘The coefficients are’, xxx, break, end; end;
   xxx1=xxx+10ˆ-10*ones(n,1); if k < 40, ‘The integer coefficients of the reactants and products are’, xxx1, ‘The smallest multiplying factor k used for the foregoing coefficients is’, k, else ‘The integer solution could not be obtained in this procedure.’; end; 
   if min(xxx1)<0, ‘Since a coefficient is negative, cheminpsolver failed; solve the ILP.’, end; 
   if rr==1, ‘cheminpsolver has failed, solve the ILP using any ILP solver.’, end; 
   
    */
    for (var k = 1; k < 40; k++) {
        xxx = math.multiply(k, xx);
        // console.log("xxx",xxx);
        var tenPowered = math.pow(10, -10);
        var tenOnes = math.multiply(tenPowered, math.ones(n));
        // console.log("tenOnes",tenOnes);          
        xxx = math.subtract(xxx, tenOnes);
        //  console.log("xxx",xxx);
        var rr = math.sum(math.subtract(math.ceil(xxx), xxx)) > .00005
            && math.sum(math.subtract(xxx, math.floor(xxx))) > .00005
            && k <= 40;
        if (rr === false) {
            console.log(`‘Value of rr=’, ${rr}, ‘Value of k =’, ${k}, ‘The coefficients are’, ${xxx}`);
            break;
        }
    }

    var xxx1 = math.add(xxx, tenOnes);
    if (k < 40) {

        console.log(`‘The integer coefficients of the reactants and products are’, ${xxx1}, ‘The smallest multiplying factor k used for the foregoing coefficients is’, ${k}`)
        return {
            coeffs: math.round(xxx1)._data,
            _coeffs: xxx1._data
        };
    }
    else {
        console.log(`‘The integer solution could not be obtained in this procedure.’; end; `)
    }
    //     if min(xxx1)<0, ‘Since a coefficient is negative, cheminpsolver failed; solve the ILP.’, end; 
    //     if rr==1, ‘cheminpsolver has failed, solve the ILP using any ILP solver.’, end; 
    if (math.min(xxx1) < 0) {
        console.log("‘Since a coefficient is negative, cheminpsolver failed; solve the ILP.’ ");
        //TODO:
    }
    if (rr === true) {
        console.log("‘cheminpsolver has failed, solve the ILP using any ILP solver.’");
        //TODO
    }
    return null;
}