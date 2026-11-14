import test from 'node:test';
import assert from 'node:assert/strict';
import { readinessHTML, READINESS } from '../src/ui/readiness.js';
for(const [status,angle] of [['nogo',-60],['caution',0],['go',60]])test(`categorical ${status} needle and text agree`,()=>{const html=readinessHTML({lvl:status,issues:[]},57);assert(html.includes(`rotate(${angle} 120 120)`));assert(html.includes(READINESS[status].title));assert(html.includes(`data-verdict="${status}"`));for(const color of ['#C73B3B','#E8AD26','#2F9E44'])assert(html.includes(color));});
test('calculated warnings preserved safely, no invented readiness score',()=>{const html=readinessHTML({lvl:'nogo',issues:[{msg:'O₂ reserve breached: 0.02 kg < reserve'},{msg:'Point of no return at 0.8 km'}]},12);assert(html.includes('0.02 kg &lt; reserve'));assert(html.includes('0.8 km'));assert(!html.includes('All limits met'));assert(!html.includes('12%'));});
test('safe explanation uses supplied oxygen value; unknown status rejected',()=>{assert(readinessHTML({lvl:'go',issues:[]},53.6).includes('54% O₂'));assert.throws(()=>readinessHTML({lvl:'unknown',issues:[]}));});
